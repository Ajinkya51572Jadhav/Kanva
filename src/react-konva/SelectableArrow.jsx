import { useRef, useEffect, useMemo, memo } from "react";
import { Group, Arrow, Circle, Transformer } from "react-konva";
import { useKonvaSnapping } from "use-konva-snapping";
import Konva from "konva";

const SelectableArrow = memo(function SelectableArrow({ shape, selected, onSelect, onChange }) {
    const groupRef = useRef(null);
    const arrowRef = useRef(null);
    const trRef = useRef(null);
    const origPtsRef = useRef(null);

    const { handleDragging, handleDragEnd } = useKonvaSnapping({
        snapRange: 5,
        guidelineColor: "blue",
        guidelineWidth: 1,
        guidelineDash: [4, 4],
        snapToStageCenter: true,
        snapToStageBorders: true,
        snapToShapes: true,
    });

    const points = useMemo(() => shape?.points || [0, 0, 150, 0], [shape?.points]);

    useEffect(() => {
        if (selected && trRef?.current && groupRef?.current) {
            trRef?.current?.nodes([groupRef?.current]);
            trRef?.current?.getLayer()?.batchDraw();
        }
    }, [selected]);

    if (!shape) return null;

    let frameId;
    const updatePoint = (index, newX, newY) => {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
            const next = points?.slice();
            next[index] = newX;
            next[index + 1] = newY;
            onChange({ ...shape, points: next });
        });
    };


    return (
        <>
            <Group
                ref={groupRef}
                x={shape?.x || 0}
                y={shape?.y || 0}
                rotation={shape?.rotation || 0}
                draggable={!shape?.locked}
                visible={shape?.visible !== false}
                onMouseDown={onSelect}
                onTap={onSelect}
                onDragMove={(e) => {
                    if (shape?.locked) return;
                    handleDragging(e);
                }}
                onDragEnd={(e) => {
                    if (shape?.locked) return;
                    handleDragEnd(e);
                    onChange({ ...shape, x: e.target.x(), y: e.target.y() });
                }}
                // capture original points before scaling
                onTransformStart={() => {
                    origPtsRef.current = points?.slice();
                }}
                onTransformEnd={() => {
                    if (shape?.locked) return;
                    const node = groupRef?.current;
                    const scaleX = node?.scaleX();
                    const scaleY = node?.scaleY();

                    // scale points in local space
                    const base = origPtsRef?.current || points;
                    const scaled = base?.map((v, i) => (i % 2 === 0 ? v * scaleX : v * scaleY));

                    // optional: keep stroke constant visually
                    // if you want stroke to scale with transform, set strokeScaleEnabled: true in shape
                    node?.scaleX(1);
                    node?.scaleY(1);

                    onChange({
                        ...shape,
                        x: node?.x(),
                        y: node?.y(),
                        rotation: Math.round(node.rotation()),
                        points: scaled,
                    });
                }}
            >
                <Arrow
                    ref={arrowRef}
                    x={0}
                    y={0}
                    points={points}
                    stroke={shape.stroke || "#000"}
                    fill={shape.fill ?? (shape.stroke || "#000")} // default fill to stroke if not provided
                    strokeWidth={shape.strokeWidth || 2}
                    dash={shape.dash || []}
                    opacity={shape.opacity ?? 1}
                    pointerLength={shape.pointerLength || 15}
                    pointerWidth={shape.pointerWidth || 15}
                    tension={shape.tension || 0}
                    lineCap={shape.lineCap || "round"}
                    lineJoin={shape.lineJoin || "round"}
                    pointerAtBeginning={!!shape.pointerAtBeginning}
                    strokeScaleEnabled={shape.strokeScaleEnabled ?? false}
                    hitStrokeWidth={shape.hitStrokeWidth || 16}
                    filters={shape.blurRadius > 0 ? [Konva.Filters.Blur] : []}
                    blurRadius={shape.blurRadius || 0}
                    shadowColor={shape.shadowColor || "black"}
                    shadowBlur={shape.shadowBlur || 0}
                    shadowOffsetX={shape.shadowOffsetX || 0}
                    shadowOffsetY={shape.shadowOffsetY || 0}
                    shadowOpacity={shape.shadowOpacity ?? 1}
                />

                {/* Drag handles for start & end when selected */}
                {selected && (
                    <>
                        {/* Start handle */}
                        <Circle
                            x={points[0]}
                            y={points[1]}
                            radius={6}
                            fill="#fff"
                            stroke="#4b9cff"
                            strokeWidth={2}
                            draggable={!shape.locked}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updatePoint(0, x, y);
                            }}
                        />
                        {/* End handle */}
                        <Circle
                            x={points[2]}
                            y={points[3]}
                            radius={6}
                            fill="#fff"
                            stroke="#4b9cff"
                            strokeWidth={2}
                            draggable={!shape.locked}
                            onDragMove={(e) => {
                                const { x, y } = e.target.position();
                                updatePoint(2, x, y);
                            }}
                        />
                    </>
                )}
            </Group>

            {selected && (

                <Transformer
                    ref={trRef}
                    rotateEnabled
                    ignoreStroke
                    enabledAnchors={["middle-left", "middle-right"]}
                    anchorSize={6}
                />

            )}
        </>
    );
})
export default SelectableArrow