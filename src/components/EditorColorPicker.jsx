import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ColorPicker, Tooltip } from "antd";

export default function EditorColorPicker({ setPagesWithHistory }) {
    const { activeIndex, selectedUniqueId } = useSelector((state) => state?.editor ?? {});
    const [color, setColor] = useState("#000000");

    // get active object if one is selected
    const getActiveObject = (pages) => {
        if (!pages[activeIndex]) return null;
        if (!selectedUniqueId) return null;
        return pages[activeIndex]?.children?.find(
            (c) => c?.id === selectedUniqueId
        );
    };

    const handleColorChange = (bg) => {
        let newColor = bg?.toHexString();
        setColor(newColor);

        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));

            if (selectedUniqueId) {
                cp[activeIndex].children = cp[activeIndex]?.children?.map((c) => {
                    if (c?.id === selectedUniqueId) {
                        if (c?.type === "text") {
                            return { ...c, fill: newColor };
                        }
                        if (c.type === "icon") {
                            return { ...c, fill: newColor };
                        }
                        if (c.type === "line") {
                            return { ...c, stroke: newColor };
                        }
                        // shapes / icons
                        return { ...c, fill: newColor };
                    }
                    return c;
                });
            } else {
                cp[activeIndex] = {
                    ...(cp[activeIndex] || {}),
                    background: newColor,
                    children: cp[activeIndex]?.children || [],
                };
            }

            return cp;
        });
    };

    useEffect(() => {
        setPagesWithHistory((prev) => {
            const obj = getActiveObject(prev);
            if (obj) {
                if (obj?.type === "text") {
                    setColor(obj?.fill || "#000000");
                } else if (obj?.type === "line") {
                    setColor(obj?.stroke || "#000000");
                } else {
                    setColor(obj?.fill || "#000000");
                }
            } else {
                setColor(prev[activeIndex]?.background || "#ffffff");
            }
            return prev;
        });
    }, [selectedUniqueId, activeIndex]);

    return (
        <Tooltip title="Color Picker" color="green">
            <ColorPicker onChange={(value) => handleColorChange(value)} value={color} />
        </Tooltip>
    );
};