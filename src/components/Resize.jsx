import React, { useEffect, useState } from "react";
import { Card, InputNumber, Switch, Select, Button, Typography, Divider, Flex } from "antd";
import { InstagramOutlined, FacebookOutlined, YoutubeOutlined, LinkedinOutlined, TwitterOutlined, VideoCameraOutlined, PrinterOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCanvasSize, setEditorPages } from "../redux/editorReducer";

const { Title, Text } = Typography;

// Social media presets
const PRESETS = {
    YouTube: [
        { name: "Channel Art", w: 2560, h: 1440 }, // Canva template
        { name: "Thumbnail", w: 1280, h: 720 },
        { name: "Shorts / Vertical", w: 1080, h: 1920 },
    ],

    Instagram: [
        { name: "Post (Square)", w: 1080, h: 1080 },
        { name: "Post (Portrait 4:5)", w: 1080, h: 1350 },
        { name: "Post (Landscape 1.91:1)", w: 1080, h: 566 },
        { name: "Story / Reel", w: 1080, h: 1920 },
    ],

    Facebook: [
        { name: "Cover (Desktop Display)", w: 820, h: 312 },
        { name: "Cover (Upload Classic)", w: 851, h: 315 }, // widely used Canva preset
        { name: "Event Cover (Standard)", w: 1200, h: 628 },
        { name: "Event Cover (Hi-res)", w: 1920, h: 1005 },
        { name: "Post (Landscape)", w: 1200, h: 630 },
        { name: "Post (Square)", w: 1080, h: 1080 },
        { name: "Story", w: 1080, h: 1920 },
        { name: "Profile Picture", w: 400, h: 400 },
    ],

    LinkedIn: [
        { name: "Personal Banner", w: 1584, h: 396 },
        { name: "Company Banner", w: 1536, h: 768 },
        { name: "Overview Tab Image", w: 360, h: 120 },
        { name: "Life Tab Hero", w: 1128, h: 376 },
        { name: "Post (with Link)", w: 1200, h: 627 },
        { name: "Profile Picture", w: 400, h: 400 },
    ],

    Twitter: [
        { name: "Header", w: 1500, h: 500 },
        { name: "Post (Landscape 16:9)", w: 1200, h: 675 },
        { name: "Post (Square)", w: 1080, h: 1080 },
        { name: "Profile Picture", w: 400, h: 400 },
    ],

    TikTok: [
        { name: "Video / Post", w: 1080, h: 1920 },
        { name: "Profile Picture", w: 200, h: 200 },
    ],

    Pinterest: [
        { name: "Pin (Standard)", w: 1000, h: 1500 },
        { name: "Pin (Square)", w: 1000, h: 1000 },
        { name: "Pin (Long/Infographic)", w: 1000, h: 2100 },
        { name: "Profile Picture", w: 165, h: 165 },
    ],

    Video: [
        { name: "1080p (Full HD)", w: 1920, h: 1080 },
        { name: "1440p (QHD)", w: 2560, h: 1440 },
        { name: "4K UHD", w: 3840, h: 2160 },
        { name: "Vertical 1080×1920", w: 1080, h: 1920 },
        { name: "Square 1080×1080", w: 1080, h: 1080 },
    ],

    Print: [
        { name: "A4 Portrait (300dpi)", w: 2480, h: 3508 },
        { name: "A4 Landscape (300dpi)", w: 3508, h: 2480 },
        { name: "A3 (300dpi)", w: 3508, h: 4961 },
        { name: "Letter Portrait (300dpi)", w: 2550, h: 3300 },
        { name: "Letter Landscape (300dpi)", w: 3300, h: 2550 },
        { name: "Business Card 3.5×2in (300dpi)", w: 1050, h: 600 },
        { name: "Poster 18×24in (300dpi)", w: 5400, h: 7200 },
        { name: "Resume (A4, 300dpi)", w: 2480, h: 3508 },
    ],
};

export default PRESETS;



// const PRESETS = {
//     Instagram: [
//         { name: "Post", w: 1080, h: 1080 },
//         { name: "Story", w: 1080, h: 1920 },
//         { name: "Ad", w: 1080, h: 1080 },
//     ],
//     Facebook: [
//         { name: "Post (Landscape)", w: 1200, h: 630 },
//         { name: "Post (Square)", w: 1080, h: 1080 },
//         { name: "Cover", w: 851, h: 315 },
//     ],
//     YouTube: [
//         { name: "Thumbnail", w: 1280, h: 720 },
//         { name: "Channel Art", w: 2560, h: 1440 },
//         { name: "Short", w: 1080, h: 1920 }
//     ],
//     LinkedIn: [
//         { name: "Banner", w: 1584, h: 396 },
//         { name: "Post", w: 1200, h: 627 },
//         { name: "Square", w: 1080, h: 1080 },
//     ],
//     Twitter: [
//         { name: "Post", w: 1600, h: 900, },
//         { name: "Header", w: 1500, h: 500 },
//         { name: "Square", w: 1080, h: 1080 },
//     ],
//     Video: [
//         { name: "Full HD", w: 1920, h: 1080 },
//         { name: "4k UHD", w: 3840, h: 2160 },
//         { name: "Vertical HD", w: 1080, h: 1920 },
//         { name: "Square HD", w: 1080, h: 1080 },
//     ],
//     Print: [
//         { name: "Invitation", w: 14, h: 14 },
//         { name: "A4 Portrait", w: 21, h: 29.7 },
//         { name: "A4 Landscape", w: 29.7, h: 21 },
//         { name: "A3", w: 29.7, h: 42 },
//         { name: "Letter Portrait", w: 8.5, h: 11 },
//         { name: "Letter Landscape", w: 11, h: 8.5 },
//         { name: "Business card", w: 3.5, h: 2 },
//         { name: "Poster", w: 18, h: 24 },
//         { name: "Resume", w: 1080, h: 1920 },
//     ],
// };

export const Resize = () => {
    const dispatch = useDispatch();
    const { canvasSize, editorPages, activeIndex } = useSelector((state) => state.editor);
    const [state, setState] = useState({ width: canvasSize.w, height: canvasSize.h, magicResize: true });

    const handleResize = () => {
        const oldW = canvasSize.w;
        const oldH = canvasSize.h;

        const scaleX = state.width / oldW;
        const scaleY = state.height / oldH;

        const updatedPages = editorPages.map((page, idx) => {
            if (idx !== activeIndex) return page;
            return {
                ...page,
                children: page.children.map((el) => ({
                    ...el,
                    x: el.x * scaleX,
                    y: el.y * scaleY,
                    width: el.width ? el.width * scaleX : el.width,
                    height: el.height ? el.height * scaleY : el.height,
                })),
            };
        });

        dispatch(setCanvasSize({ w: state.width, h: state.height }));
        dispatch(setEditorPages(updatedPages));
    };


    const applyPreset = (w, h) => {
        setState((prev) => ({ ...prev, width: w, height: h }));
        dispatch(setCanvasSize({ w, h }));
    };


    return (
        <div style={{ width: "100%", height: "70vh", overflow: "auto" }}>
            <Flex align="center" justify="space-between" style={{ marginBottom: "5%" }}>
                <Text>Use magic resize</Text>
                <Switch size="small" checked={state.magicResize} onChange={(value) => setState((prev) => ({ ...prev, magicResize: value }))} />
            </Flex>

            <Flex align="center" justify="space-between" style={{ marginBottom: "5%" }}>
                <Text type="secondary">Width</Text>
                <InputNumber min={1} value={state.width} onChange={(value) => setState((prev) => ({ ...prev, width: Number(value) || 1 }))} style={{ width: "60%" }} />
            </Flex>

            <Flex align="center" justify="space-between" style={{ marginBottom: "5%" }}>
                <Text type="secondary">Height</Text>
                <InputNumber
                    min={1}
                    value={state.height}
                    onChange={(value) => setState((prev) => ({ ...prev, height: Number(value) || 1 }))} style={{ width: "60%" }}
                />
            </Flex>

            <Button type="primary" block onClick={handleResize}>
                Resize
            </Button>

            <Divider style={{ margin: "12px 0" }} />

            {/* Presets */}
            {Object.entries(PRESETS).map(([platform, sizes]) => (

                <div key={platform}>
                    <Title level={5} style={{ marginBottom: 8, fontSize: 14 }}>
                        {platform === "Instagram" && <InstagramOutlined style={{ marginRight: 6 }} />}
                        {platform === "Facebook" && <FacebookOutlined style={{ marginRight: 6 }} />}
                        {platform === "YouTube" && <YoutubeOutlined style={{ marginRight: 6 }} />}
                        {platform === "LinkedIn" && <LinkedinOutlined style={{ marginRight: 6 }} />}
                        {platform === "Twitter" && <TwitterOutlined style={{ marginRight: 6 }} />}
                        {platform === "Video" && <VideoCameraOutlined style={{ marginRight: 6 }} />}
                        {platform === "Print" && <PrinterOutlined style={{ marginRight: 6 }} />}
                        {platform}

                    </Title>
                    {sizes.map((preset) => (
                        <>
                            <Card key={preset.name} style={{ margin: 5 }} hoverable onClick={() => applyPreset(preset.w, preset.h)}>
                                <div
                                    style={{ display: 'grid', justifyContent: 'center', alignContent: 'center', justifyItems: 'center' }}>
                                    {platform === "Instagram" && <InstagramOutlined style={{ fontSize: 20 }} />}
                                    {platform === "Facebook" && <FacebookOutlined style={{ fontSize: 20 }} />}
                                    {platform === "YouTube" && <YoutubeOutlined style={{ fontSize: 20 }} />}
                                    {platform === "LinkedIn" && <LinkedinOutlined style={{ fontSize: 20 }} />}
                                    {platform === "Twitter" && <TwitterOutlined style={{ fontSize: 20 }} />}
                                    {platform === "Video" && <VideoCameraOutlined style={{ fontSize: 20 }} />}
                                    {platform === "Print" && <PrinterOutlined style={{ fontSize: 20 }} />}

                                    <Text>{`${preset.name}`}</Text>
                                    <Text>{preset.w} × {preset.h} {preset.u}</Text>
                                </div>
                            </Card>
                        </>
                    ))}
                </div>
            ))}
        </div>
    );
};





