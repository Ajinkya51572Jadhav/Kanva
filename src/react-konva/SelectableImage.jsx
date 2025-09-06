import React, { useRef, useEffect } from "react";
import { Transformer, Image as KonvaImage } from "react-konva";
import { useKonvaSnapping } from "use-konva-snapping";
import Konva from "konva";

export default function SelectableImage({ shape, selected, onSelect, onChange }) {
    const imgRef = useRef();
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
        if (!shape?.src) return;

        const previewImg = new window.Image();
        previewImg.crossOrigin = "anonymous";
        previewImg.src = shape?.src;
        previewImg.onload = () => {
            if (imgRef?.current) {
                imgRef?.current?.image(previewImg);
                applyFilters();
                imgRef?.current.getLayer()?.batchDraw();
            }
        };
    }, [shape?.src, shape?.filters, shape?.flipX, shape?.flipY]);

    const applyFilters = () => {
        if (!imgRef.current) return;
        const node = imgRef.current;
        let filters = [];

        if (shape?.grayscale) filters?.push(Konva.Filters.Grayscale);
        if (shape?.sepia) filters.push(Konva.Filters.Sepia);
        if (shape?.blur > 0) filters?.push(Konva.Filters.Blur);
        if (shape?.brightness !== 0) filters?.push(Konva.Filters.Brighten);
        if (shape?.contrast !== 0) filters?.push(Konva.Filters.Contrast);
        if (shape?.hue !== 0) filters?.push(Konva.Filters.HSV);
        if (shape?.saturation !== 0) filters?.push(Konva.Filters.HSV);

        node?.filters(filters);
        node?.blurRadius(shape?.blur || 0);
        node?.brightness(shape?.brightness || 0);
        node?.contrast(shape?.contrast || 0);
        node?.hue(shape?.hue || 0);
        node?.saturation(shape?.saturation || 0);
        node?.cache(); // improves performance
    };

    useEffect(() => {
        applyFilters();
    }, [shape]);

    useEffect(() => {
        if (selected && trRef?.current && imgRef?.current) {
            trRef?.current?.nodes([imgRef?.current]);
            trRef?.current?.getLayer()?.batchDraw();
        }
    }, [selected]);

    if (!shape) return null;

    function isLocked() {
        if (shape?.locked) return;
    }

    return (
        <>
            <KonvaImage
                ref={imgRef}
                x={shape?.x}
                y={shape?.y}
                width={shape?.width}
                height={shape?.height}
                rotation={shape?.rotation || 0}
                draggable={!shape?.locked}
                visible={shape?.visible}
                scaleX={shape?.flipH ? -1 : 1}
                scaleY={shape?.flipV ? -1 : 1}
                offsetX={shape?.flipH ? shape?.width : 0}
                offsetY={shape?.flipV ? shape?.height : 0}
                opacity={shape?.opacity ?? 1}
                shadowColor={shape?.shadowColor || "black"}
                shadowBlur={shape?.shadowBlur || 0}
                shadowOffsetX={shape?.shadowOffsetX || 0}
                shadowOffsetY={shape?.shadowOffsetY || 0}
                shadowOpacity={shape?.shadowOpacity || 0}
                cornerRadius={shape?.cornerRadius || 0}
                stroke={shape?.borderColor || ""}
                strokeWidth={shape?.borderWidth || 0}
                onMouseDown={onSelect}
                onTap={onSelect}
                onDragMove={(e) => {
                    isLocked();
                    const nx = e?.target?.x();
                    const ny = e?.target?.y();
                    handleDragging(e);
                    e?.target?.position({ x: nx, y: ny });
                }}
                onDragEnd={(e) => {
                    isLocked()
                    handleDragEnd(e)
                    onChange({ ...shape, x: e.target.x(), y: e.target.y() })
                }}
                onTransformEnd={() => {
                    isLocked()
                    const node = imgRef?.current;
                    if (!node) return;
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
};