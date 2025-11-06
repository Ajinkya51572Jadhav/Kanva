
import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Image, Space, Skeleton } from "antd";
import { Stage, Layer, Rect, Text, Image as KonvaImage } from "react-konva";
import { useDispatch, useSelector } from "react-redux";

import tea from "../assets/tea.png";
import banner7 from "../assets/banner-7.png";
import banner8 from "../assets/banner-8.png";
import banner9 from "../assets/banner-9.png";
import banner10 from "../assets/banner-10.png";
import banner11 from "../assets/banner-11.png";




const banners = [
    {
        name: "Creative Portfolio Banner",
        type: "banner",
        x: 100,
        y: 60,
        children: [
            {
                id: `b${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 950,
                height: 500,
                fill: "#fdfdfd",
                cornerRadius: 20,
            },
            {
                id: `b${Date.now()}-by`,
                type: "text",
                text: "By Claudia Silvia",
                x: 40,
                y: 30,
                fontSize: 14,
                fill: "#111827",
            },
            {
                id: `b${Date.now()}-center-title`,
                type: "text",
                text: "Portfolio Presentation",
                x: 400,
                y: 30,
                fontSize: 14,
                align: "center",
                fill: "#111827",
            },
            {
                id: `b${Date.now()}-role`,
                type: "text",
                text: "Graphic Designer",
                x: 750,
                y: 30,
                fontSize: 14,
                align: "right",
                fill: "#111827",
            },
            {
                id: `b${Date.now()}-big-text`,
                type: "text",
                text: "PORTFOLIO",
                x: 80,
                y: 150,
                fontSize: 120,
                fontStyle: "bold",
                fill: "#f472b6", // pink
                opacity: 0.9,
            },
            {
                id: `b${Date.now()}-script-text`,
                type: "text",
                text: "Creative",
                x: 260,
                y: 100,
                fontSize: 60,
                fontStyle: "italic",
                fontFamily: "Brush Script MT, cursive",
                fill: "#111827",
            },
            {
                id: `b${Date.now()}-photo`,
                type: "image",
                x: 350,
                y: 90,
                width: 300,
                height: 400,
                src: banner7,
            },
            {
                id: `b${Date.now()}-desc`,
                type: "text",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                x: 40,
                y: 420,
                fontSize: 14,
                width: 400,
                fill: "#374151",
            },
            {
                id: `b${Date.now()}-page`,
                type: "text",
                text: "01",
                x: 880,
                y: 440,
                fontSize: 14,
                fill: "#111827",
            },
        ],
    },
    {
        name: "Freya Moore Portfolio Banner",
        type: "banner",
        x: 0,
        y: 0,
        children: [
            {
                id: `b${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 950,
                height: 500,
                fill: "#ffffff",
            },
            {
                id: `b${Date.now()}-left-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 450,
                height: 500,
                fill: "#ffffff",
            },
            {
                id: `b${Date.now()}-portfolio`,
                type: "text",
                text: "PORTFOLIO",
                x: 100,
                y: 40,
                fontSize: 14,
                fontFamily: "Arial",
                fill: "#111827",
            },
            {
                id: `b${Date.now()}-name`,
                type: "text",
                text: "Freya\nMoore",
                x: 100,
                y: 100,
                fontSize: 60,
                fontFamily: "Georgia",
                fontStyle: "bold",
                lineHeight: 1.2,
                fill: "#111827",
            },
            {
                id: `b${Date.now()}-role`,
                type: "text",
                text: "DESIGNER & ART DIRECTOR",
                x: 100,
                y: 280,
                fontSize: 14,
                fontFamily: "Arial",
                fill: "#374151",
            },
            {
                id: `b${Date.now()}-email`,
                type: "text",
                text: "EMAIL ME",
                x: 350,
                y: 280,
                fontSize: 14,
                fontFamily: "Arial",
                fontStyle: "bold",
                fill: "#111827",
            },
            {
                id: `b${Date.now()}-photo`,
                type: "image",
                x: 450,
                y: 0,
                width: 500,
                height: 500,
                src: banner9,
            },
        ],
    },
    {
        name: "Morgana Perry Anniversary Banner",
        type: "banner",
        x: 0,
        y: 0,
        children: [
            {
                id: `b${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 950,
                height: 500,
                fill: "#fdf2f8",
            },
            {
                id: `b${Date.now()}-arch`,
                type: "arc",
                x: 210,
                y: 70,
                innerRadius: 70,
                outerRadius: 70,
                angle: 180,
                rotation: 180,
                stroke: "#374151",
                strokeWidth: 1,
            },
            {
                id: `b${Date.now()}-mp`,
                type: "text",
                text: "M&P",
                x: 185,
                y: 40,
                fontSize: 20,
                fontFamily: "Times New Roman",
                fontStyle: "bold",
                fill: "#374151",
            },
            {
                id: `b${Date.now()}-names`,
                type: "text",
                text: "MORGANA\nAND PERRY",
                x: 120,
                y: 120,
                fontSize: 58,
                fontFamily: "Times New Roman",
                fontStyle: "bold",
                align: "center",
                lineHeight: 1.1,
                fill: "#374151",
            },
            {
                id: `b${Date.now()}-subtitle`,
                type: "text",
                text: "celebrate 50 years",
                x: 160,
                y: 250,
                fontSize: 28,
                fontFamily: "Times New Roman",
                fontStyle: "normal",
                fill: "#374151",
            },
            {
                id: `b${Date.now()}-line`,
                type: "line",
                points: [230, 290, 330, 290],
                stroke: "#374151",
                strokeWidth: 1,
            },
            {
                id: `b${Date.now()}-date`,
                type: "text",
                text: "February 10, 2030 at four o’clock in the afternoon",
                x: 100,
                y: 320,
                fontSize: 16,
                fontFamily: "Arial",
                fill: "#374151",
            },
            {
                id: `b${Date.now()}-flowers`,
                type: "image",
                x: 450,
                y: -50,
                width: 500,
                height: 500,
                src: banner8
            },
        ],
    },
    {
        name: "AI Banner",
        type: "banner",
        x: 0,
        y: 0,
        children: [
            {
                id: `b${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 950,
                height: 500,
                fillLinearGradientStartPoint: { x: 0, y: 0 },
                fillLinearGradientEndPoint: { x: 950, y: 500 },
                fillLinearGradientColorStops: [0, "#1e1b4b", 1, "#312e81"],
            },
            {
                id: `b${Date.now()}-stripe`,
                type: "rect",
                x: 250,
                y: 0,
                width: 120,
                height: 500,
                fillLinearGradientStartPoint: { x: 250, y: 0 },
                fillLinearGradientEndPoint: { x: 370, y: 500 },
                fillLinearGradientColorStops: [0, "#a78bfa", 1, "#1e1b4b"],
                opacity: 0.7,
            },
            {
                id: `b${Date.now()}-cube`,
                type: "image",
                x: -100,
                y: -10,
                width: 800,
                height: 400,
                src: banner10,
            },
            {
                id: `b${Date.now()}-title`,
                type: "text",
                text: "AI",
                x: 600,
                y: 80,
                fontSize: 40,
                fontStyle: "bold",
                fontFamily: "Arial",
                fill: "#93c5fd",
            },
            {
                id: `b${Date.now()}-desc`,
                type: "text",
                text: "Lorem ipsum dolor amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                x: 520,
                y: 140,
                width: 360,
                fontSize: 14,
                lineHeight: 1.5,
                fontFamily: "Arial",
                fill: "#cbd5e1",
            },
            {
                id: `b${Date.now()}-highlight`,
                type: "text",
                text: "AI will transform industries, optimize workflows, and create smarter systems.",
                x: 520,
                y: 250,
                width: 360,
                fontSize: 14,
                fontStyle: "bold",
                lineHeight: 1.5,
                fontFamily: "Arial",
                fill: "#ffffff",
            },
            {
                id: `b${Date.now()}-dots`,
                type: "circle",
                x: 640,
                y: 360,
                radius: 5,
                fill: "#64748b",
            },
            {
                id: `b${Date.now()}-dots-active`,
                type: "circle",
                x: 660,
                y: 360,
                radius: 5,
                fill: "#60a5fa",
            },
            {
                id: `b${Date.now()}-dots2`,
                type: "circle",
                x: 680,
                y: 360,
                radius: 5,
                fill: "#64748b",
            },
        ],
    },
    {
        name: "Art Workshop Banner",
        preview: "art_workshop_banner.png",
        x: 100,
        y: 60,
        type: "banner",
        children: [
            {
                id: `aw-${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 900,
                height: 500,
                fill: "#f8f6f0"
            },
            {
                id: `b${Date.now()}-workshop-art`,
                type: "image",
                x: 0,
                y: 0,
                width: 900,
                height: 500,
                src: banner11
            },
            {
                id: `aw-${Date.now()}-splash1`,
                type: "circle",
                x: 80,
                y: 120,
                radius: 25,
                fill: "#ff6b35",
                opacity: 0.8
            },
            {
                id: `aw-${Date.now()}-splash2`,
                type: "circle",
                x: 120,
                y: 80,
                radius: 18,
                fill: "#f7931e",
                opacity: 0.7
            },
            {
                id: `aw-${Date.now()}-splash3`,
                type: "circle",
                x: 60,
                y: 200,
                radius: 22,
                fill: "#4ecdc4",
                opacity: 0.8
            },
            {
                id: `aw-${Date.now()}-brush`,
                type: "rect",
                x: 40,
                y: 150,
                width: 8,
                height: 80,
                fill: "#8b4513",
                rotation: 15
            },
            {
                id: `aw-${Date.now()}-brush-tip`,
                type: "rect",
                x: 35,
                y: 140,
                width: 18,
                height: 25,
                fill: "#2c3e50",
                rotation: 15
            },

            {
                id: `aw-${Date.now()}-badge`,
                type: "rect",
                x: 340,
                y: 30,
                width: 160,
                height: 35,
                cornerRadius: 18,
                fill: "#4ecdc4",
            },
            {
                id: `aw-${Date.now()}-badge-text`,
                type: "text",
                text: "Studio Shodwe",
                x: 365,
                y: 42,
                fontSize: 16,
                fill: "#ffffff",
                fontFamily: "sans-serif",
                fontStyle: "bold"
            },

            {
                id: `aw-${Date.now()}-title-art`,
                type: "text",
                text: "Art",
                x: 140,
                y: 160,
                fontSize: 80,
                fill: "#ff6b35",
                fontFamily: "sans-serif",
                fontStyle: "bold"
            },

            {
                id: `aw-${Date.now()}-title-workshop`,
                type: "text",
                text: "Workshop",
                x: 140,
                y: 240,
                fontSize: 80,
                fill: "#ff6b35",
                fontFamily: "sans-serif",
                fontStyle: "bold"
            },

            {
                id: `aw-${Date.now()}-date-badge`,
                type: "rect",
                x: 320,
                y: 320,
                width: 200,
                height: 40,
                cornerRadius: 20,
                fill: "#4ecdc4",
            },
            {
                id: `aw-${Date.now()}-date-text`,
                type: "text",
                text: "April 15, 2024",
                x: 345,
                y: 335,
                fontSize: 18,
                fill: "#ffffff",
                fontFamily: "sans-serif",
                fontStyle: "bold"
            },
            {
                id: `aw-${Date.now()}-artwork1`,
                type: "circle",
                x: 700,
                y: 140,
                radius: 30,
                fill: "#ff6b35",
                opacity: 0.8
            },
            {
                id: `aw-${Date.now()}-artwork2`,
                type: "circle",
                x: 780,
                y: 180,
                radius: 25,
                fill: "#4ecdc4",
                opacity: 0.7
            },
            {
                id: `aw-${Date.now()}-artwork3`,
                type: "rect",
                x: 720,
                y: 200,
                width: 40,
                height: 20,
                fill: "#f7931e",
                opacity: 0.8
            },

            {
                id: `aw-${Date.now()}-splash4`,
                type: "circle",
                x: 800,
                y: 300,
                radius: 20,
                fill: "#e74c3c",
                opacity: 0.6
            },
            {
                id: `aw-${Date.now()}-splash5`,
                type: "circle",
                x: 750,
                y: 350,
                radius: 15,
                fill: "#9b59b6",
                opacity: 0.7
            },
            {
                id: `aw-${Date.now()}-splash6`,
                type: "circle",
                x: 820,
                y: 380,
                radius: 12,
                fill: "#3498db",
                opacity: 0.8
            },
            {
                id: `aw-${Date.now()}-dot1`,
                type: "circle",
                x: 600,
                y: 80,
                radius: 8,
                fill: "#f39c12",
                opacity: 0.9
            },
            {
                id: `aw-${Date.now()}-dot2`,
                type: "circle",
                x: 580,
                y: 400,
                radius: 6,
                fill: "#e67e22",
                opacity: 0.8
            },
        ]
    },
    {
        name: "Rimberio Cafe Banner",
        preview: "rimberio_cafe_banner.png",
        x: 100,
        y: 60,
        type: "banner",
        children: [
            {
                id: `rc-${Date.now()}-bg`,
                type: "rect",
                x: 0,
                y: 0,
                width: 900,
                height: 500,
                fill: "#f5f1e8"
            },
            {
                id: `b${Date.now()}-workshop-Cafe`,
                type: "image",
                x: -40,
                y: -80,
                width: 900,
                height: 500,
                src: tea
            },

            {
                id: `rc-${Date.now()}-title-rimberio`,
                type: "text",
                text: "Rimberio",
                x: 50,
                y: 80,
                fontSize: 48,
                fill: "#8b4513",
                fontFamily: "serif",
                fontStyle: "italic"
            },

            {
                id: `rc-${Date.now()}-title-cafe`,
                type: "text",
                text: "Cafe",
                x: 280,
                y: 80,
                fontSize: 48,
                fill: "#8b4513",
                fontFamily: "serif",
                fontStyle: "italic"
            },

            {
                id: `rc-${Date.now()}-star1`,
                type: "text",
                text: "✦",
                x: 380,
                y: 45,
                fontSize: 16,
                fill: "#8b4513"
            },
            {
                id: `rc-${Date.now()}-star2`,
                type: "text",
                text: "✧",
                x: 400,
                y: 35,
                fontSize: 12,
                fill: "#8b4513"
            },
            {
                id: `rc-${Date.now()}-star3`,
                type: "text",
                text: "✦",
                x: 415,
                y: 50,
                fontSize: 14,
                fill: "#8b4513"
            },

            {
                id: `rc-${Date.now()}-subtitle`,
                type: "text",
                text: "Good morning, but coffee first",
                x: 50,
                y: 130,
                fontSize: 20,
                fill: "#8b4513",
                fontFamily: "sans-serif"
            },

            {
                id: `rc-${Date.now()}-desc1`,
                type: "text",
                text: "A presentation is a formal or informal communication",
                x: 50,
                y: 220,
                fontSize: 14,
                fill: "#8b4513",
                fontFamily: "sans-serif"
            },

            {
                id: `rc-${Date.now()}-desc2`,
                type: "text",
                text: "method that involves conveying information, ideas, or a",
                x: 50,
                y: 240,
                fontSize: 14,
                fill: "#8b4513",
                fontFamily: "sans-serif"
            },

            {
                id: `rc-${Date.now()}-desc3`,
                type: "text",
                text: "message to an audience.",
                x: 50,
                y: 260,
                fontSize: 14,
                fill: "#8b4513",
                fontFamily: "sans-serif"
            },

        ]
    },
]


function KonvaImg({ el }) {
    const [img, setImg] = useState(null);

    useEffect(() => {
        if (!el?.src) return;
        const image = new window.Image();
        image.crossOrigin = "anonymous";
        image.src = window.location.origin + el.src;

        image.onload = () => {
            setImg(image);
        };
    }, [el?.src]);

    return img ? <KonvaImage image={img} {...el} /> : null;
}


export default function BannerList({ setPagesWithHistory }) {
    const dispatch = useDispatch();
    const { activeIndex } = useSelector((state) => state?.editor ?? {});
    const stageRefs = useRef([]);
    const [thumbs, setThumbs] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!banners?.length) return;
        setLoading(false);
        const timeout = setTimeout(() => {
            const previews = banners.map((bnr, i) =>
                stageRefs.current[i]?.toDataURL({ pixelRatio: 2 })
            );
            setThumbs(previews.map((url, i) => ({ url, banner: banners[i] })));
            setLoading(true);
        }, 200); // wait for images to load

        return () => clearTimeout(timeout);
    }, [banners]);




    const applyTemplate = (template) => {
        if (!template) return;
        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const children = (template?.children || []).map((el) => ({ ...el, id: `${el?.id}-${Date.now()}` }));
            cp[activeIndex] = { ...(cp[activeIndex] || {}), children, background: template?.background };
            return cp;
        });
        dispatch(setSelectedUniqueId(null));
        dispatch(setPopUp(false));
    };

    return (
        <>
            <div style={{ display: "none" }}>
                {banners?.map((bnr, i) => (
                    <Stage
                        key={i}
                        width={900}
                        height={500}
                        ref={(el) => (stageRefs.current[i] = el)}
                    >
                        <Layer>
                            {bnr?.children.map((el) => {
                                return (
                                    <>
                                        {el.type === "rect" ? (
                                            <Rect key={el.id + el.type} {...el} />
                                        ) : el.type === "text" ? (
                                            <Text key={el.id + el.type} {...el} />
                                        ) : el.type === "image" ? (
                                            <KonvaImg key={el.id + el.type} el={el} />
                                        ) : null}
                                    </>
                                )
                            }

                            )}
                        </Layer>
                    </Stage>
                ))}
            </div>
            {loading ? (
                <Row gutter={[0, 20]}>
                    {thumbs.map((t, i) => (
                        <Col key={i} onClick={() => applyTemplate(t.banner)}>
                            <Image
                                src={t.url}
                                alt={t.banner.name}
                                preview={false}
                                width={"100%"}
                                height={125}
                                style={{ objectFit: "cover", cursor: "pointer" }}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                        <Space>
                            <Skeleton.Avatar active size="large" shape="square" />
                            <Skeleton.Button active size={'default'} shape={'circle'} block={true} />
                        </Space>
                        <Skeleton.Input active size={'default'} block={true} />
                        <Space>
                            <Skeleton.Button active />
                            <Skeleton.Avatar active />
                            <Skeleton.Input active size="small" />
                        </Space>

                    </div>
                </>
            )
            }
        </>
    );
}