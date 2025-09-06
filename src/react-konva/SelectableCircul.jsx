import { useRef, useEffect } from "react";
import { Circle, Transformer } from "react-konva";
import { useKonvaSnapping } from "use-konva-snapping";
import Konva from "konva";

export default function SelectableCircle({ shape, selected, onSelect, onChange }) {
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
        if (selected && trRef?.current && ref?.current) {
            trRef?.current?.nodes([ref?.current]);
            trRef?.current?.getLayer()?.batchDraw();
        }
    }, [selected]);

    if (!shape) return null;

    return (
        <>
            <Circle
                ref={ref}
                x={shape?.x || 100}
                y={shape?.y || 100}
                radius={shape?.radius || 50}
                stroke={shape?.stroke || "#000"}
                fill={shape?.fill || "transparent"}
                strokeWidth={shape?.strokeWidth || 2}
                dash={shape?.dash || []}
                opacity={shape?.opacity ?? 1}
                shadowColor={shape?.shadowColor || undefined}
                shadowBlur={shape?.shadowBlur || 0}
                shadowOffsetX={shape?.shadowOffsetX || 0}
                shadowOffsetY={shape?.shadowOffsetY || 0}
                shadowOpacity={shape?.shadowOpacity ?? 1}
                draggable={!shape?.locked}
                visible={shape?.visible !== false}
                filters={shape?.blurRadius ? [Konva?.Filters?.Blur] : []}
                blurRadius={shape?.blurRadius || 0}
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
                    const node = ref?.current;
                    const scaleX = node?.scaleX();
                    const scaleY = node?.scaleY();
                    // average scale for consistent radius
                    const newRadius = node?.radius() * ((scaleX + scaleY) / 2);
                    node?.scaleX(1);
                    node?.scaleY(1);
                    onChange({
                        ...shape,
                        x: node.x(),
                        y: node.y(),
                        radius: newRadius,
                        rotation: Math.round(node.rotation()),
                    });
                }}
            />
            {selected && <Transformer ref={trRef} rotateEnabled />}
        </>
    );
}



// import { useRef, useEffect } from "react";
// import { Circle, Transformer } from "react-konva";
// import { useKonvaSnapping } from "use-konva-snapping";
// import Konva from "konva";

// export default function SelectableCircle({ shape, selected, onSelect, onChange }) {
//     const ref = useRef();
//     const trRef = useRef();

//     const { handleDragging, handleDragEnd } = useKonvaSnapping({
//         snapRange: 5,
//         guidelineColor: "blue",
//         guidelineWidth: 1,
//         guidelineDash: [4, 4],
//         snapToStageCenter: true,
//         snapToStageBorders: true,
//         snapToShapes: true,
//     });

//     useEffect(() => {
//         if (selected && trRef.current && ref.current) {
//             trRef.current.nodes([ref.current]);
//             trRef.current.getLayer().batchDraw();
//         }
//     }, [selected]);

//     if (!shape) return null;

//     return (
//         <>
//             <Circle
//                 ref={ref}
//                 x={shape.x || 100}
//                 y={shape.y || 100}
//                 radius={shape.radius || 50}   // ✅ Circle uses radius, not width/height
//                 stroke={shape.stroke || "#000"}
//                 fill={shape.fill || "transparent"}
//                 strokeWidth={shape.strokeWidth || 2}
//                 draggable={!shape.locked}
//                 visible={shape.visible !== false}  // ✅ default true
//                 filters={shape.blurRadius ? [Konva.Filters.Blur] : []}
//                 blurRadius={shape.blurRadius || 0}
//                 onMouseDown={onSelect}
//                 onTap={onSelect}
//                 onDragMove={(e) => {
//                     if (shape.locked) return;
//                     handleDragging(e);
//                 }}
//                 onDragEnd={(e) => {
//                     if (shape.locked) return;
//                     handleDragEnd(e);
//                     onChange({ ...shape, x: e.target.x(), y: e.target.y() });
//                 }}
//                 onTransformEnd={() => {
//                     if (shape.locked) return;
//                     const node = ref.current;
//                     const scaleX = node.scaleX();
//                     node.scaleX(1);
//                     node.scaleY(1);
//                     onChange({
//                         ...shape,
//                         x: node.x(),
//                         y: node.y(),
//                         radius: node.radius() * scaleX,   // ✅ properly update radius
//                         rotation: Math.round(node.rotation()),
//                     });
//                 }}
//             />
//             {selected && <Transformer ref={trRef} rotateEnabled />}
//         </>
//     );
// }



// import { useRef, useEffect } from "react";
// import { Circle, Transformer, } from "react-konva";
// import { useKonvaSnapping } from "use-konva-snapping";
// import Konva from "konva";



// export default function SelectableCircul({ shape, selected, onSelect, onChange }) {
//     const ref = useRef();
//     const trRef = useRef();

//     const { handleDragging, handleDragEnd } = useKonvaSnapping({
//         snapRange: 5,
//         guidelineColor: "blue",
//         guidelineWidth: 1,
//         guidelineDash: [4, 4],
//         snapToStageCenter: true,
//         snapToStageBorders: true,
//         snapToShapes: true,
//     });

//     useEffect(() => {
//         if (selected && trRef.current && ref.current) {
//             trRef.current.nodes([ref.current]);
//             trRef.current.getLayer().batchDraw();
//         }
//     }, [selected]);

//     if (!shape) return null;



//     return (
//         <>
//             <Circle
//                 ref={ref}
//                 {...shape}
//                 draggable={!shape.locked} // ✅ disable drag if locked
//                 visible={shape.visible}
//                 filters={shape.blurRadius ? [Konva.Filters.Blur] : []}
//                 blurRadius={shape.blurRadius || 0}
//                 cornerRadius={shape.cornerRadius || 0}
//                 onMouseDown={onSelect}
//                 onTap={onSelect}
//                 onDragMove={(e) => {
//                     if (shape.locked) return; // ✅ block drag updates
//                     handleDragging(e);
//                     e.target.position({ x: e.target.x(), y: e.target.y() });
//                 }}
//                 onDragEnd={(e) => {
//                     if (shape.locked) return; // ✅ prevent updating pos
//                     handleDragEnd(e)
//                     onChange({ ...shape, x: e.target.x(), y: e.target.y() })
//                 }}
//                 onTransformEnd={() => {
//                     if (shape.locked) return; // ✅ block resize/rotate
//                     const node = ref.current;
//                     const scaleX = node.scaleX();
//                     const scaleY = node.scaleY();
//                     node.scaleX(1);
//                     node.scaleY(1);
//                     onChange({
//                         ...shape,
//                         x: node.x(),
//                         y: node.y(),
//                         width: node.width() * scaleX,
//                         height: node.height() * scaleY,
//                         rotation: Math.round(node.rotation()),
//                     });
//                 }}
//             />
//             {selected && <Transformer ref={trRef} rotateEnabled />}
//         </>
//     );
// }
