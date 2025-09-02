import { useRef, useEffect } from "react";
import { Rect, Transformer, } from "react-konva";
import { useKonvaSnapping } from "use-konva-snapping";
import Konva from "konva";



export function SelectableRect({ shape, selected, onSelect, onChange }) {
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
            <Rect
                ref={ref}
                {...shape}
                draggable={!shape.locked} // ✅ disable drag if locked
                visible={shape.visible}
                filters={shape.blurRadius ? [Konva.Filters.Blur] : []}
                blurRadius={shape.blurRadius || 0}
                cornerRadius={shape.cornerRadius || 0}
                onMouseDown={onSelect}
                onTap={onSelect}
                onDragMove={(e) => {
                    if (shape.locked) return; // ✅ block drag updates
                    handleDragging(e);
                    e.target.position({ x: e.target.x(), y: e.target.y() });
                }}
                onDragEnd={(e) => {
                    if (shape.locked) return; // ✅ prevent updating pos
                    handleDragEnd(e)
                    onChange({ ...shape, x: e.target.x(), y: e.target.y() })
                }}
                onTransformEnd={() => {
                    if (shape.locked) return; // ✅ block resize/rotate
                    const node = ref.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shape,
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        height: node.height() * scaleY,
                        rotation: Math.round(node.rotation()),
                    });
                }}
            />
            {selected && <Transformer ref={trRef} rotateEnabled />}
        </>
    );
}
