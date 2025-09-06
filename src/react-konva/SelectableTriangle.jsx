import { useRef, useEffect } from "react";
import { RegularPolygon, Transformer } from "react-konva";
import { useKonvaSnapping } from "use-konva-snapping";
import Konva from "konva";

export default function SelectableTriangle({ shape, selected, onSelect, onChange }) {
    const ref = useRef();
    const trRef = useRef();

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
        if (selected && trRef.current && ref.current) {
            trRef.current.nodes([ref.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [selected]);

    if (!shape) return null;

    return (
        <>
            <RegularPolygon
                ref={ref}
                x={shape?.x || 100}
                y={shape?.y || 100}
                sides={shape?.sides ?? 3}
                radius={shape?.radius || 60}
                rotation={shape?.rotation || 0}
                stroke={shape?.stroke || "#000"}
                fill={shape?.fill || "transparent"}
                strokeWidth={shape?.strokeWidth || 2}
                dash={shape?.dash || []}
                opacity={shape?.opacity ?? 1}
                draggable={!shape?.locked}
                visible={shape?.visible !== false}
                filters={shape?.blurRadius ? [Konva?.Filters?.Blur] : []}
                blurRadius={shape?.blurRadius || 0}
                shadowColor={shape?.shadowColor || "black"}
                shadowBlur={shape?.shadowBlur || 0}
                shadowOffsetX={shape?.shadowOffsetX || 0}
                shadowOffsetY={shape?.shadowOffsetY || 0}
                shadowOpacity={shape?.shadowOpacity ?? 1}
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
                onTransformEnd={() => {
                    if (shape?.locked) return;
                    const node = ref.current;
                    const scaleX = node.scaleX();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shape,
                        x: node.x(),
                        y: node.y(),
                        radius: node.radius() * scaleX,  
                        rotation: Math.round(node.rotation()),
                    });
                }}
            />
            {selected && <Transformer ref={trRef} rotateEnabled />}
        </>
    );
}
