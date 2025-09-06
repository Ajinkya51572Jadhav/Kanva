import React, { useRef, useState, useEffect } from "react";
import { Text, Transformer } from "react-konva";
import { useKonvaSnapping } from "use-konva-snapping";

export default function SelectableText({ shape, selected, onSelect, onChange}) {
    const ref = useRef();
    const trRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [draftText, setDraftText] = useState(shape?.text || "");

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
        const handleKeyDown = (e) => {
            if (!isEditing || !ref.current) return;
            e.preventDefault();
            let newText =draftText;

            if (e.key === "Backspace") {
                newText = newText.slice(0, -1);
            } else if (e.key.length === 1) {
                newText = newText + e.key;
            } else if (e.key === "Enter") {
                newText = newText + "\n";
            } else if (e.key === "Escape") {
                setIsEditing(false);
                return;
            }
            
            setDraftText(newText)
            // ref.current.text(newText);
            // ref.current.getLayer().batchDraw();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isEditing,draftText,shape?.text]);

    const commitEdit = () => {
        if (!isEditing) return;
        setIsEditing(false);
        if (shape?.text !== draftText) {
            onChange({ ...shape, text: draftText });
        }
    };

    useEffect(() => {
        if (selected && !isEditing && trRef.current && ref.current) {
            trRef.current.nodes([ref.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [selected, isEditing]);

    if (!shape) return null;


    useEffect(() => {
        if (ref.current) {
            ref.current.fill(shape.fill);
            ref.current.getLayer()?.batchDraw();
        }
    }, [shape?.fill]);


    useEffect(() => {
        if (ref.current && shape?.textTransform) {
            setDraftText((text) => {
                if (shape?.textTransform === "lowercase") return String(text)?.toLowerCase();
                if (shape?.textTransform === "uppercase") return String(text)?.toUpperCase();
                 if (shape?.textTransform === "none") return text;
                return text;
            });
        }
    }, [shape?.textTransform]);

    function isLocked(){
      if (shape?.locked) return; 
    }

    return (
        <>
            <Text
                ref={ref}
                {...shape}
                
                textDecoration={[
                    shape?.underline ? "underline" : "",
                    shape?.lineThrough ? "line-through" : "",
                ].join(" ")}

                fontStyle={`${shape?.bold ? "bold " : ""}${shape?.italic ? "italic" : ""}`}
                text={draftText}
                draggable={!isEditing===!shape?.locked}
                visible={shape?.visible}
                onMouseDown={(e) => {
                     isLocked();
                    onSelect(e);
                    if (isEditing) commitEdit();
                }}
                onTap={(e) => {
                    isLocked()
                    onSelect(e);
                    if (isEditing) commitEdit();
                }}
                onDblClick={() =>{
                    isLocked() 
                    setIsEditing(true)
                    }}
                onDblTap={() =>{
                    isLocked()
                     setIsEditing(true)
                     }}
                onDragMove={(e) => {
                      isLocked(); 
                    handleDragging(e);
                    e.target.position({ x: e.target.x(), y: e.target.y() });
                }}
                onDragEnd={(e) => {
                     isLocked(); 
                    commitEdit();
                    handleDragEnd(e)
                    onChange({ ...shape, x: e.target.x(), y: e.target.y() });
                }}
                onTransformEnd={() => {
                    isLocked(); 
                    const node = ref.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    const rotation = node.rotation();

                    node.scaleX(1);
                    node.scaleY(1);

                    const width = Math.max(20, node.width() * scaleX);
                    const fontSize = Math.max(6, (shape?.fontSize || 16) * scaleY);

                    commitEdit();
                    onChange({
                        ...shape,
                        x: node.x(),
                        y: node.y(),
                        width: width,
                        fontSize: Math.round(fontSize),
                        rotation: Math.round(rotation),
                    });
                }}

                onMouseEnter={(e) => {
                      isLocked()
                    const stage = e.target.getStage();
                    if (stage) stage.container().style.cursor = "move";
                }}
                onMouseLeave={(e) => {
                    isLocked() 
                    const stage = e.target.getStage();
                    if (stage) stage.container().style.cursor = "default";
                }}
            />

            {selected && !isEditing && (
                <Transformer
                    ref={trRef}
                    // rotateEnabled
                    enabledAnchors={[
                        "middle-left",
                        "middle-right",
                        
                        "top-center",
                        "bottom-center",

                        "top-left",
                        "top-right",
                        
                        "bottom-left",
                        "bottom-right",
                    ]}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 20 || newBox.height < 10) return oldBox;
                        newBox.width = newBox.width;
                        newBox.height = newBox.height;
                        return newBox;
                    }}
                    onTransformStart={(e) => {
                        const stage = e.target.getStage();
                        if (stage) stage.container().style.cursor = "nwse-resize";
                    }}
                    onTransformEnd={(e) => {
                        const stage = e.target.getStage();
                        if (stage) stage.container().style.cursor = "default";
                    }}
                />
            )}
        </>
    );
}