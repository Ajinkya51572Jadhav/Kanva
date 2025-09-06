import { Group } from "react-konva";
import { useKonvaSnapping } from 'use-konva-snapping';
import { useDispatch, useSelector } from 'react-redux';
import { setPopUp, setSelectedUniqueId } from '../redux/editorReducer';

import SelectableText from '../react-konva/SelectableText';
import SelectableRect from '../react-konva/SelectableRect';
import SelectableImage from '../react-konva/SelectableImage';
import SelectableIcon from '../react-konva/SelectableIcon';
import SelectableCircul from '../react-konva/SelectableCircul';
import SelectableTriangle from '../react-konva/SelectableTriangle';
import SelectableStar from '../react-konva/SelectableStar';
import SelectableArrow from '../react-konva/SelectableArrow';
import SelectableLine from '../react-konva/SelectableLine';
import SelectablePolygon from '../react-konva/SelectablePolygon';

const EditorLayer = ({ el, setElement, stageRef }) => {
    if (!el) return null;

    const dispatch = useDispatch();
    const { selectedUniqueId } = useSelector((state) => state?.editor ?? {});


    const { handleDragging, handleDragEnd } = useKonvaSnapping({
        snapRange: 5,
        guidelineColor: "blue",
        guidelineWidth: 1,
        guidelineDash: [4, 4],
        snapToStageCenter: true,
        snapToStageBorders: true,
        snapToShapes: true,
    });

    // Utility to convert possible formats of points to flat number array for Konva Line
    // const flattenPoints = (points) => {
    //     if (!points) return [];
    //     if (!Array.isArray(points)) return [];
    //     if (points.length === 0) return [];
    //     if (typeof points[0] === "number") return points;
    //     // if points are of form [[x,y],[x,y],...] or [ [x,y], x, y, ... ], flatten safely
    //     return points.flatMap((p) => (Array.isArray(p) ? p : [p]).flat());
    // };

    function handleOnes(id) {
        dispatch(setSelectedUniqueId(id));
        dispatch(setPopUp(false));
    };

    if (el?.type === "text") {
        return <SelectableText key={el?.id} shape={el} selected={selectedUniqueId === el?.id} stageRef={stageRef}
            onSelect={() => handleOnes(el?.id)}
            onChange={(next) => setElement(el?.id, () => next)}
        />;
    }



    // if (el.type === "stroke") {
    //     const pts = flattenPoints(el.points);
    //     return (
    //         <Line
    //             key={el.id}
    //             points={pts}
    //             stroke={el.strokeColor || "#000"}
    //             strokeWidth={el.strokeWidth || el.strokeWidth === 0 ? el.strokeWidth : el.strokeWidth || 2}
    //             lineCap={el.line || "round"}
    //             lineJoin="round"
    //             tension={0.2}
    //             opacity={el.opacity || 1}
    //             onMouseDown={() => handleOnes(el.id)}
    //             onTap={() => handleOnes(el.id)}
    //             draggable={false}
    //         />
    //     );
    // }

    if (el?.type === "banner") {
        return (
            <Group
                key={el?.id}
                x={el?.x || 0}
                y={el?.y || 0}
                draggable
                onClick={() => handleOnes(el?.id)}
                onTap={() => handleOnes(el?.id)}
                onDragMove={(e) => {
                    handleDragging(e);
                }}
                onDragEnd={(e) => {
                    handleDragEnd(e)
                }}
            >
                {(el?.children || [])?.map((child) => (
                    <EditorLayer
                        key={child?.id}
                        el={child}
                        setElement={(id, updater) => {
                            setElement(el?.id, (banner) => {
                                const updatedChildren = banner?.children?.map((c) =>
                                    c?.id === id ? updater(c) : c
                                );
                                return { ...banner, children: updatedChildren };
                            });
                        }}
                        stageRef={stageRef}
                    />
                ))}
            </Group>
        );
    }

    if (el?.type === "icon") {
        return (
            <SelectableIcon
                key={el?.id}
                shape={el}
                selected={selectedUniqueId === el?.id}
                onSelect={() => handleOnes(el?.id)}
                onChange={(next) => setElement(el?.id, () => next)}
            />
        );
    }
    if (el?.type === "image") {
        return <SelectableImage
            key={el?.id}
            shape={el}
            selected={selectedUniqueId === el?.id}
            onSelect={() => handleOnes(el?.id)}
            onChange={(next) => setElement(el?.id, () => next)}
        />;
    }

    if (el?.type === "rect") {
        return <SelectableRect key={el?.id} shape={el} selected={selectedUniqueId === el?.id}
            onSelect={() => handleOnes(el?.id)}
            onChange={(next) => setElement(el?.id, () => next)}
        />;
    }

    if (el?.type === "circle") {
        return <SelectableCircul key={el?.id} shape={el} selected={selectedUniqueId === el?.id}
            onSelect={() => handleOnes(el?.id)}
            onChange={(next) => setElement(el?.id, () => next)}
        />;
    }

    if (el?.type === "triangle") {
        return <SelectableTriangle key={el?.id} shape={el} selected={selectedUniqueId === el?.id}
            onSelect={() => handleOnes(el?.id)}
            onChange={(next) => setElement(el?.id, () => next)}
        />;
    }

    if (el?.type === "star") {
        return <SelectableStar key={el?.id} shape={el} selected={selectedUniqueId === el?.id}
            onSelect={() => handleOnes(el?.id)}
            onChange={(next) => setElement(el?.id, () => next)}
        />;
    }


    if (el?.type === "arrow") {
        return (
            <SelectableArrow
                key={el?.id}
                shape={el}
                selected={selectedUniqueId === el?.id}
                onSelect={() => handleOnes(el?.id)}
                onChange={(next) => setElement(el?.id, () => next)}
            />
        );
    }

    if (el?.type === "line") {
        return (
            <SelectableLine
                key={el?.id}
                shape={el}
                selected={selectedUniqueId === el?.id}
                onSelect={() => handleOnes(el?.id)}
                onChange={(next) => setElement(el?.id, () => next)}
            />
        );
    }

    if (el?.type === "polygon") {
        return (
            <SelectablePolygon
                key={el?.id}
                shape={el}
                selected={selectedUniqueId === el?.id}
                onSelect={() => handleOnes(el?.id)}
                onChange={(next) => setElement(el?.id, () => next)}
            />
        );
    }



    return null;
}

export default EditorLayer; 