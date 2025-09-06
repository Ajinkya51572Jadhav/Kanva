import React, { useRef, useEffect } from "react";
import { Group, Path, Transformer } from "react-konva";
import { useKonvaSnapping } from "use-konva-snapping";

const BASE = 96;

export default function SelectableIcon({ shape, selected, onSelect, onChange }) {
  const groupRef = useRef();
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
    if (selected && trRef?.current && groupRef?.current) {
      trRef?.current?.nodes([groupRef?.current]);
      trRef?.current?.getLayer()?.batchDraw();
    }
  }, [selected]);

  function isLocked() {
    if (shape?.locked) return;
  }

  return (
    <>
      <Group
        ref={groupRef}
        x={shape?.x}
        y={shape?.y}
        rotation={shape?.rotation || 0}
        draggable={!shape?.locked}
        visible={shape?.visible}
        onMouseDown={onSelect}
        onTap={onSelect}
        onDragMove={(e) => {
          isLocked();
          handleDragging(e);
          e?.target?.position({ x: e?.target?.x(), y: e?.target?.y() });
        }}
        onDragEnd={(e) => {
          isLocked();
          handleDragEnd(e)
          onChange({ ...shape, x: e.target.x(), y: e.target.y() })
        }}
        onTransformEnd={() => {
          isLocked();
          const node = groupRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          const newW = Math.max(5, shape?.width * scaleX);  
          const newH = Math?.max(5, shape?.height * scaleY);

          onChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            width: newW,
            height: newH,
            rotation: Math.round(node?.rotation()),
          });
        }}
        opacity={shape?.opacity ?? 1}
      >
        <Path
          data={shape?.path}
          fill={shape?.fill || "black"}
          width={shape?.width}
          height={shape?.height}
          scaleX={shape?.width / BASE}
          scaleY={shape?.height / BASE}
        />
      </Group>

      {selected && (
        <Transformer
          ref={trRef}
          rotateEnabled
          resizeEnabled
          keepRatio={false}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox?.width < 1 || newBox?.height < 1) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )
      }
    </>
  );
};
