import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { Group, Line, Circle, Transformer } from "react-konva";
import { useKonvaSnapping } from "use-konva-snapping";
import Konva from "konva";


function SelectableLineComponent({ shape, selected, onSelect, onChange }) {
    const groupRef = useRef(null);
    const lineRef = useRef(null);
    const trRef = useRef(null);
    const rafRef = useRef(null);
    const origPtsRef = useRef(null);

    const points = useMemo(
        () => (Array.isArray(shape?.points) && shape?.points?.length === 4 ? shape?.points : [0, 0, 150, 0]),
        [shape?.points]
    );

    const { handleDragging, handleDragEnd } = useKonvaSnapping({
        snapRange: 5,
        guidelineColor: "blue",
        guidelineWidth: 1,
        guidelineDash: [4, 4],
        snapToStageCenter: true,
        snapToStageBorders: true,
        snapToShapes: true,
    });

    useEffect(() => {
        if (selected && trRef?.current && groupRef?.current) {
            trRef?.current?.nodes([groupRef?.current]);
            trRef?.current?.getLayer()?.batchDraw();
        }
    }, [selected]);

    const updateAnchorPoint = useCallback(
        (index, x, y) => {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const next = points.slice();
                next[index] = x;
                next[index + 1] = y;
                onChange({ ...shape, points: next });
            });
        },
        [points, shape, onChange]
    );

    const onTransformStart = () => {
        origPtsRef.current = points.slice();
    };

    const onTransformEnd = () => {
        if (shape.locked) return;
        const node = groupRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const base = origPtsRef.current || points;
        const scaled = base.map((v, i) => (i % 2 === 0 ? v * scaleX : v * scaleY));
        // reset scale
        node.scaleX(1);
        node.scaleY(1);
        onChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            rotation: Math.round(node.rotation() || 0),
            points: scaled,
        });
    };

    if (!shape) return null;

    return (
        <>
            <Group
                ref={groupRef}
                x={shape?.x || 0}
                y={shape?.y || 0}
                rotation={shape?.rotation || 0}
                draggable={!shape?.locked}
                visible={shape?.visible !== false}
                onMouseDown={(e) => {
                    if (onSelect) onSelect();
                }}
                onTap={(e) => {
                    if (onSelect) onSelect();
                }}
                onDragMove={(e) => {
                    if (shape?.locked) return;
                    handleDragging(e);
                }}
                onDragEnd={(e) => {
                    if (shape?.locked) return;
                    handleDragEnd(e);
                    onChange({ ...shape, x: e.target.x(), y: e.target.y() });
                }}
                onTransformStart={onTransformStart}
                onTransformEnd={onTransformEnd}
            >
                <Line
                    ref={lineRef}
                    points={points}
                    curve={shape?.curve || false}
                    stroke={shape?.stroke || "#000"}
                    strokeWidth={shape?.strokeWidth ?? 2}
                    dash={Array?.isArray(shape?.dash) ? shape?.dash : []}
                    lineCap={shape?.lineCap || "round"}
                    lineJoin={shape?.lineJoin || "round"}
                    tension={shape?.curve ? (shape?.tension ?? 0.5) : 0}

                    opacity={shape?.opacity ?? 1}
                    filters={shape?.blurRadius > 0 ? [Konva.Filters.Blur] : []}
                    blurRadius={shape?.blurRadius || 0}
                    shadowColor={shape?.shadowColor}
                    shadowBlur={shape?.shadowBlur}
                    shadowOffsetX={shape?.shadowOffsetX}
                    shadowOffsetY={shape?.shadowOffsetY}
                    shadowOpacity={shape?.shadowOpacity}
                    strokeScaleEnabled={shape?.strokeScaleEnabled ?? false}
                    hitStrokeWidth={shape?.hitStrokeWidth ?? 16}
                />

                {selected && (
                    <>
                        {/* start handle */}
                        <Circle
                            x={points[0]}
                            y={points[1]}
                            radius={6}
                            fill="#fff"
                            stroke="#4b9cff"
                            strokeWidth={2}
                            draggable={!shape?.locked}
                            onDragMove={(e) => {
                                if (shape?.locked) return;
                                const { x, y } = e.target.position();
                                updateAnchorPoint(0, x, y);
                            }}
                            onDragEnd={(e) => {
                                if (shape?.locked) return;
                                const { x, y } = e.target.position();
                                updateAnchorPoint(0, x, y);
                            }}
                        />

                        {/* end handle */}
                        <Circle
                            x={points[2]}
                            y={points[3]}
                            radius={6}
                            fill="#fff"
                            stroke="#4b9cff"
                            strokeWidth={2}
                            draggable={!shape?.locked}
                            onDragMove={(e) => {
                                if (shape?.locked) return;
                                const { x, y } = e.target.position();
                                updateAnchorPoint(2, x, y);
                            }}
                            onDragEnd={(e) => {
                                if (shape?.locked) return;
                                const { x, y } = e.target.position();
                                updateAnchorPoint(2, x, y);
                            }}
                        />
                    </>
                )}
            </Group>

            {selected && (
                <Transformer
                    ref={trRef}
                    rotateEnabled
                    ignoreStroke={false}
                    anchorSize={7}
                />
            )}
        </>
    );
}

export default React.memo(SelectableLineComponent);
