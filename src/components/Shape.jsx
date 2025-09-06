import { useSelector } from "react-redux";
import { Col, Row } from "antd";

import { GiSquare } from "react-icons/gi";
import { LiaCircleSolid } from "react-icons/lia";
import { PiTriangleThin } from "react-icons/pi";
import { PiStarThin } from "react-icons/pi";
import { TbLine } from "react-icons/tb";
import { HiArrowRight } from "react-icons/hi2";
import { BiPolygon } from "react-icons/bi";

export default function Shape({ setPagesWithHistory }) {
    const { activeIndex } = useSelector((state) => state.editor ?? {});

    const shapeDefaults = {
        rect: {
            type: "rect",
            x: 100,
            y: 100,
            width: 120,
            height: 80,
            stroke: "#000",
            fill: "#ccc",
            strokeWidth: 2,
        },
        circle: {
            type: "circle",
            x: 120,
            y: 120,
            radius: 50,
            stroke: "#000",
            fill: "#ccc",
            strokeWidth: 2,
        },
        triangle: {
            type: "triangle",
            x: 120,
            y: 120,
            radius: 60, // used to calculate triangle points
            stroke: "#000",
            fill: "#ccc",
            strokeWidth: 2,
        },
        star: {
            type: "star",
            x: 150,
            y: 150,
            numPoints: 5,
            innerRadius: 30,
            outerRadius: 60,
            stroke: "#000",
            fill: "#ccc",
            strokeWidth: 2,
        },
        line: {
            type: "line",
            points: [50, 50, 200, 50], // x1,y1,x2,y2
            stroke: "#000",
            strokeWidth: 3,
            lineCap: "round",
            lineJoin: "round",
        },
        arrow: {
            type: "arrow",
            points: [50, 100, 200, 100],
            stroke: "#000",
            fill: "#000",
            strokeWidth: 3,
            pointerLength: 15,
            pointerWidth: 15,
            lineCap: "round",
            lineJoin: "round",
        },
        polygon: {
            type: "polygon",
            x: 150,
            y: 150,
            radius: 60,
            sides: 6,
            stroke: "#000",
            fill: "#ccc",
            strokeWidth: 2,
        },
    };

    const addShape = (shapeKey) => {
        const newShape = {
            id: `${Date.now()}`,
            draggable: true,
            ...shapeDefaults[shapeKey], 
        };

        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const page = cp[activeIndex] || { children: [] };
            page.children = page?.children || [];
            page?.children?.push(newShape);
            cp[activeIndex] = page;
            return cp;
        });
    };

    const shapes = [
        {
            key: "rect",
            label: "Rectangle",
            icon: <GiSquare />,
        },
        {
            key: "circle",
            label: "Circle",
            icon: <LiaCircleSolid />
        },
        {

            key: "triangle",
            label: "Triangle",
            icon: <PiTriangleThin />,
        },
        {
            key: "star",
            label: "Star",
            icon: <PiStarThin />,
        },
        {
            key: "line",
            label: "Line",
            icon: <TbLine />,
        },
        {
            key: "arrow",
            label: "Arrow",
            icon: <HiArrowRight />,
        },
        {
            key: "polygon",
            label: "Polygon",
            icon: <BiPolygon />,
        },
    ];

    return (
        <>
            <Row>
                {shapes?.map((sh) => (
                    <Col span={12} onClick={() => addShape(sh?.key)} title={sh?.label} key={sh?.key}
                        style={{ fontSize: 80, color: "lightgray", cursor: "pointer" }}>
                        {sh?.icon}
                    </Col>
                ))}
            </Row>
        </>
    );
}
