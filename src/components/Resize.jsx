import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, InputNumber, Switch, Button, Typography, Divider, Flex } from "antd";

import { setCanvasSize, setEditorPages } from "../redux/editorReducer";
import { FaInstagram } from "react-icons/fa6";
import { LiaFacebookSquare } from "react-icons/lia";
import { CiYoutube, CiLinkedin, CiTwitter } from "react-icons/ci";


const { Title, Text } = Typography;

// Social media presets
const PRESETS = {
    YouTube: [
        { name: "Channel Art", w: 2560, h: 1440 },
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
        { name: "Cover (Upload Classic)", w: 851, h: 315 },
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
    ]
};


export default function Resize() {
    const dispatch = useDispatch();
    const { canvasSize, editorPages, activeIndex } = useSelector((state) => state?.editor ?? {});
    const [state, setState] = useState({ width: canvasSize?.w, height: canvasSize?.h, magicResize: true });

    const handleResize = () => {
        const oldW = canvasSize?.w;
        const oldH = canvasSize?.h;

        const scaleX = state?.width / oldW;
        const scaleY = state?.height / oldH;

        const updatedPages = editorPages?.map((page, idx) => {
            if (idx !== activeIndex) return page;
            return {
                ...page,
                children: page?.children?.map((el) => ({
                    ...el,
                    x: el?.x * scaleX,
                    y: el?.y * scaleY,
                    width: el?.width ? el?.width * scaleX : el?.width,
                    height: el?.height ? el?.height * scaleY : el?.height,
                })),
            };
        });

        dispatch(setCanvasSize({ w: state?.width, h: state?.height }));
        dispatch(setEditorPages(updatedPages));
    };


    const applyPreset = (w, h) => {
        setState((prev) => ({ ...prev, width: w, height: h }));
        dispatch(setCanvasSize({ w, h }));
    };


    return (
        <>
            <Flex align="center" justify="space-between" style={{ marginBottom: "5%" }}>
                <Text>Use magic resize</Text>
                <Switch size="small" checked={state?.magicResize} onChange={(value) => setState((prev) => ({ ...prev, magicResize: value }))} />
            </Flex>

            <Flex align="center" justify="space-between" style={{ marginBottom: "5%" }}>
                <Text type="secondary">Width</Text>
                <InputNumber min={1} value={state?.width} onChange={(value) => setState((prev) => ({ ...prev, width: Number(value) || 1 }))} style={{ width: "60%" }} />
            </Flex>

            <Flex align="center" justify="space-between" style={{ marginBottom: "5%" }}>
                <Text type="secondary">Height</Text>
                <InputNumber
                    min={1}
                    value={state?.height}
                    onChange={(value) => setState((prev) => ({ ...prev, height: Number(value) || 1 }))} style={{ width: "60%" }}
                />
            </Flex>

            <Button type="primary" block onClick={handleResize}>
                Resize
            </Button>

            <Divider style={{ margin: "12px 0" }} />

            {/* Presets */}
            {Object.entries(PRESETS)?.map(([platform, sizes]) => (

                <div key={platform}>
                    <Title level={5}>
                        <Flex align="center" justify="start" gap={2}>
                            {platform === "Instagram" && <FaInstagram size={20} />}
                            {platform === "Facebook" && <LiaFacebookSquare size={25} />}
                            {platform === "YouTube" && <CiYoutube size={23} />}
                            {platform === "LinkedIn" && <CiLinkedin size={26} />}
                            {platform === "Twitter" && <CiTwitter size={25} />}
                            {platform}
                        </Flex>

                    </Title>
                    {sizes?.map((preset, index) => (
                        <>
                            <Card key={preset?.name + index} style={{ margin: 5 }} hoverable onClick={() => applyPreset(preset?.w, preset?.h)}>
                                <div
                                    style={{ display: 'grid', justifyContent: 'center', alignContent: 'center', justifyItems: 'center' }}>
                                    {platform === "Instagram" && <FaInstagram size={25} />}
                                    {platform === "Facebook" && <LiaFacebookSquare size={31} />}
                                    {platform === "YouTube" && <CiYoutube size={28} />}
                                    {platform === "LinkedIn" && <CiLinkedin fontSize={30} />}
                                    {platform === "Twitter" && <CiTwitter size={28} />}

                                    <Text>{`${preset?.name}`}</Text>
                                    <Text>{preset?.w} × {preset?.h} {preset?.u}</Text>
                                </div>
                            </Card>
                        </>
                    ))}
                </div>
            ))}
        </>
    );
};





