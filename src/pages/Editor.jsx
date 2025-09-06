import { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Button, ColorPicker, Dropdown, Flex, Tooltip, Tour, Typography } from "antd";

import { setCollapsed, setEditorPages, setPopUp, setSaveTemplate, setSelectedUniqueId, setZoom } from '../redux/editorReducer';

import { IoDuplicateOutline, IoSaveOutline } from "react-icons/io5";
import { HiOutlinePencil } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SlReload } from "react-icons/sl";
import { GoZoomIn, GoZoomOut } from "react-icons/go";

import EditorLayer from "../components/EditorLayer";
import Sidebar from "../components/Sidebar";
import Share from '../components/Share';
import UndoRedo from '../components/UndoRedo';
import AddPage from '../components/AddPage';
import EditorColorPicker from '../components/EditorColorPicker';


export default function Editor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const tplId = searchParams.get("id");

    const { path, collapsed, zoom, activeIndex, selectedUniqueId, editorPages, popup, canvasSize, savedTemplates } = useSelector((state) => state?.editor ?? {});



    const stageRef = useRef(null);
    // refs for tour steps
    const undoRedoRef = useRef(null);
    const colorPickerRef = useRef(null);
    const shareRef = useRef(null);
    const duplicateRef = useRef(null);
    const deleteRef = useRef(null);
    const addPageRef = useRef(null);
    const canvasRef = useRef(null);
    const sidebarRef = useRef(null);
    const containerRef = useRef(null);

    // undo/redo
    const [pushHistory, setPushHistory] = useState(editorPages);

    // tour state
    const [openTour, setOpenTour] = useState(false);

    const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

    const activePage = editorPages[activeIndex] || { children: [], background: "#ffffff" };
    const selectedEl = (activePage?.children || [])?.find((e) => e?.id === selectedUniqueId);

    // pen tool state
    const [isPenTool, setIsPenTool] = useState(false);
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const [penColor, setPenColor] = useState("#000000");
    const [penSize, setPenSize] = useState(3);
    const [penOpacity, setPenOpacity] = useState(1);
    const [lineCap, setLineCap] = useState("round"); // "round" | "square"



    const steps = [
        {
            title: "Undo & Redo",
            description: "Quickly reverse or reapply your last action.",
            target: () => undoRedoRef?.current,
        },
        {
            title: "Background Color",
            description: "Pick a background color to customize your canvas.",
            target: () => colorPickerRef?.current,
        },
        {
            title: "Share & Export",
            description: "Download or share your design with others.",
            target: () => shareRef?.current,
        },
        {
            title: "Duplicate Element",
            description: "Clone the selected element instantly.",
            target: () => duplicateRef?.current,
        },
        {
            title: "Delete Element",
            description: "Remove the selected element from your design.",
            target: () => deleteRef?.current,
        },
        {
            title: "Templates & Assets",
            description: "Browse creative templates and design elements / double click on Text edit",
            target: () => sidebarRef?.current,
        },
        {
            title: "Add New Page",
            description: "Insert an extra page to expand your design.",
            target: () => addPageRef?.current,
        },
        {
            title: "Canvas Workspace",
            description: "Your main editing area. Drag, drop, and edit freely.",
            target: () => canvasRef?.current,
        },
    ];

    const showbtn = path === "menubar" ? { collapsedButtonRender: false } : {};


    useEffect(() => {
        if (tplId) {
            const tpl = savedTemplates?.find((t) => String(t?.id) === tplId);
            if (tpl) dispatch(setEditorPages(tpl?.pages));
        }
    }, [tplId, savedTemplates]);


    useEffect(() => {
        if (stageRef?.current) {
            stageRef?.current?.width(canvasSize?.w);
            stageRef?.current?.height(canvasSize?.h);
            stageRef?.current?.batchDraw();
        }
    }, [canvasSize]);

    useEffect(() => {
        if (!containerRef?.current) return;

        const resizeObserver = new ResizeObserver(() => {
            setContainerSize({
                w: containerRef?.current?.offsetWidth,
                h: containerRef?.current?.offsetHeight,
            });
        });

        resizeObserver?.observe(containerRef?.current);
        return () => resizeObserver?.disconnect();
    }, []);

    useEffect(() => {
        if (!canvasSize?.w || !canvasSize?.h || !containerSize?.w || !containerSize?.h) return;

        const scaleX = containerSize?.w / canvasSize?.w;
        const scaleY = containerSize?.h / canvasSize?.h;

        const newZoom = Math.min(scaleX, scaleY) * 0.9; // keep 10% padding
        dispatch(setZoom(newZoom));
    }, [canvasSize, containerSize]);


    const handleMouseDown = useCallback((e) => {
        if (!isPenTool) return;
        isDrawing.current = true;
        const pos = e.target.getStage().getRelativePointerPosition();
        setLines((prev) => [
            ...prev,
            {
                points: [pos?.x, pos?.y],
                color: penColor,
                size: penSize,
                opacity: penOpacity,
                cap: lineCap,
            },
        ]);
    }, [isPenTool, penColor, penSize, penOpacity, lineCap]);

    const handleMouseMove = useCallback((e) => {
        if (!isDrawing.current || !isPenTool) return;
        const stage = e?.target.getStage();
        const point = stage.getRelativePointerPosition();
        setLines((prev) => {
            const lastLine = prev[prev?.length - 1];
            const newLines = prev?.slice();
            lastLine.points = lastLine?.points?.concat([point?.x, point?.y]);
            newLines.splice(prev.length - 1, 1, lastLine);
            return newLines;
        });
    }, [isPenTool]);

    const handleMouseUp = useCallback(() => {
        if (!isPenTool) return;
        isDrawing.current = false;
    }, [isPenTool]);

    const clearAnnotations = () => setLines([]);

    const setPagesWithHistory = (updaterOrPages) => {
        const next = typeof updaterOrPages === "function" ? updaterOrPages(editorPages) : updaterOrPages;
        setTimeout(() => setPushHistory(next), 0);
        dispatch(setEditorPages(next));
    };

    const setElement = (id, updater) => {
        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const els = (cp[activeIndex]?.children || [])?.map((el) => (el && el?.id === id ? updater(el) : el));
            cp[activeIndex] = { ...cp[activeIndex], children: els };
            return cp;
        });
    };

    const openMiniFor = (id) => {
        dispatch(setSelectedUniqueId(id));
        const el = (activePage?.children || [])?.find((e) => e?.id === id);
        if (el?.type === "text") dispatch(setPopUp(true));
        else dispatch(setPopUp(false));
    };

    const deleteSelected = () => {
        if (!selectedUniqueId) return;
        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const page = cp[activeIndex] || { children: [] };
            page.children = (page?.children || [])?.filter((el) => el?.id !== selectedUniqueId);
            cp[activeIndex] = page;
            return cp;
        });
        dispatch(setSelectedUniqueId(null));
        dispatch(setPopUp(false));
    };

    const duplicateSelected = () => {
        if (!selectedUniqueId) return;
        const el = (activePage?.children || [])?.find((e) => e?.id === selectedUniqueId);
        if (!el) return;
        const id = `${el?.id}-copy-${Date.now()}`;
        const copy = { ...el, id, x: (el?.x || 0) + 20, y: (el?.y || 0) + 20 };
        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const page = cp[activeIndex] || { children: [] };
            page.children = page?.children || [];
            page?.children?.push(copy);
            cp[activeIndex] = page;
            return cp;
        });
        openMiniFor(id);
    };


    return (
        <>
            <ProLayout
                {...showbtn}
                fixSiderbar={false}
                collapsed={path === "menubar" ? true : collapsed?.child}
                onCollapse={(val) => dispatch(setCollapsed({ parent: true, child: val }))}
                menu={{ hideMenuWhenCollapsed: true }}
                menuHeaderRender={false}
                menuContentRender={() => (
                    <div ref={sidebarRef} style={{ width: "100%", height: "82vh", overflow: "auto" }}>
                        <Sidebar
                            selectedEl={selectedEl}
                            setElement={setElement}
                            activePage={activePage}
                            setPagesWithHistory={setPagesWithHistory}
                            openMiniFor={openMiniFor}
                            stageRef={stageRef}
                        />
                    </div>
                )}
            >
                <PageContainer
                    content={
                        <>
                            <Flex align="center" justify="start" gap={20} wrap style={{ background: "white", padding: 10, borderRadius: 5 }}>

                                <div ref={undoRedoRef}>
                                    <UndoRedo pushHistory={pushHistory} />
                                </div>
                                <div ref={colorPickerRef}>
                                    <EditorColorPicker setPagesWithHistory={setPagesWithHistory} />
                                </div>
                                <div ref={shareRef}>
                                    <Share stageRef={stageRef} />
                                </div>
                                <Tooltip title="Duplicate" color="pink">
                                    <Button ref={duplicateRef} type="link" icon={<IoDuplicateOutline />} onClick={duplicateSelected} style={{ fontSize: 18 }} />
                                </Tooltip>

                                <Tooltip title="Delete" color="red">
                                    <Button ref={deleteRef} type="link" icon={<RiDeleteBin5Line size={22} color="red" />} onClick={deleteSelected} style={{ fontSize: 18 }} />
                                </Tooltip>

                                <Tooltip title="Zoom Out">
                                    <Button
                                        shape="circle"
                                        icon={<GoZoomOut size={18} color="gray" />}
                                        onClick={() => dispatch(setZoom(Math.max(0.2, zoom - 0.1)))}
                                    />
                                </Tooltip>

                                <Typography style={{ textAlign: "center" }}>
                                    {Math.round(zoom * 100)}%
                                </Typography>

                                <Tooltip title="Zoom In">
                                    <Button
                                        shape="circle"
                                        icon={<GoZoomIn size={18} color="gray" />}
                                        onClick={() => dispatch(setZoom(Math.min(3, zoom + 0.1)))}
                                    />
                                </Tooltip>

                                <Tooltip title="Reset Zoom">
                                    <Button
                                        type="dashed"
                                        shape="circle"
                                        icon={<SlReload size={20} color="gray" />}
                                        onClick={() => dispatch(setZoom(1))}
                                    />
                                </Tooltip>

                                <Dropdown
                                    placement="top"
                                    trigger={["click"]}
                                    popupRender={() => (
                                        <Flex style={{ padding: 10, background: "white", border: "1px solid #bf7575ff" }} gap={10}>
                                            <Tooltip title={`Line Color`}>
                                                <ColorPicker value={penColor} onChange={(value) => setPenColor(value.toRgbString())} />
                                            </Tooltip>

                                            <Tooltip title={`Size ${penSize}`}>
                                                <input
                                                    type="range"
                                                    min={1}
                                                    max={20}
                                                    value={penSize}
                                                    onChange={(e) => setPenSize(Number(e.target.value))}
                                                />
                                            </Tooltip>

                                            <Tooltip title={`Opacity ${penOpacity}`}>
                                                <input
                                                    type="range"
                                                    min={0.1}
                                                    max={1}
                                                    step={0.1}
                                                    value={penOpacity}
                                                    onChange={(e) => setPenOpacity(Number(e.target.value))}
                                                />
                                            </Tooltip>
                                            <Button
                                                size="small"
                                                type={lineCap === "round" ? "primary" : "default"}
                                                onClick={() => setLineCap("round")}
                                            >
                                                Round
                                            </Button>
                                            <Button
                                                size="small"
                                                type={lineCap === "square" ? "primary" : "default"}
                                                onClick={() => setLineCap("square")}
                                            >
                                                Square
                                            </Button>
                                            <Button size="small" danger onClick={clearAnnotations}>
                                                Clear Annotations
                                            </Button>
                                        </Flex>
                                    )}
                                >
                                    <Button
                                        icon={<HiOutlinePencil />}
                                        type={isPenTool ? "primary" : "default"}
                                        shape="circle"
                                        onClick={() => setIsPenTool((p) => !p)}
                                    /></Dropdown>

                                <Tooltip title="Save Template">
                                    <Button
                                        type="primary"
                                        icon={<IoSaveOutline size={16} />}
                                        onClick={() => {
                                            if (stageRef.current) {
                                                const preview = stageRef.current.toDataURL({ pixelRatio: 0.3 }); // small thumbnail
                                                dispatch(
                                                    setSaveTemplate({
                                                        id: Date.now(),
                                                        pages: editorPages,
                                                        preview,
                                                    })
                                                );
                                            }
                                            navigate("/");
                                        }}
                                    >
                                        Save
                                    </Button>
                                </Tooltip>

                                <Button type="primary" onClick={() => setOpenTour(true)}>
                                    Start Tour
                                </Button>
                            </Flex>
                        </>
                    }
                    footer={<div ref={addPageRef}><AddPage setPagesWithHistory={setPagesWithHistory} /></div>}
                    footerToolBarProps={{ style: { width: "100%", display: "grid", justifyContent: "center", padding: "10px" } }}
                    style={{ width: "100%", height: "80vh" }}
                >
                    <>
                        <div ref={canvasRef} style={{ width: "100%", height: "68vh", overflow: "auto" }}>
                            <div ref={containerRef}>

                                <Stage
                                    ref={stageRef}
                                    key={`${canvasSize?.w}x${canvasSize?.h}`}
                                    width={canvasSize?.w}
                                    height={canvasSize?.h}
                                    // scaleX={zoom}
                                    // scaleY={zoom}
                                    scale={{ x: zoom, y: zoom }}
                                    x={(containerSize?.w - canvasSize?.w * zoom) / 2}
                                    y={(containerSize?.h - canvasSize?.h * zoom) / 2}
                                    style={{
                                        // width: canvasSize?.w,
                                        background: activePage?.background,
                                    }}
                                    onMouseDown={(e) => {
                                        if (e.target === e.target.getStage()) {
                                            dispatch(setSelectedUniqueId(null));
                                            dispatch(setPopUp(false));
                                        }
                                        handleMouseDown(e);
                                    }}
                                    onMousemove={handleMouseMove}
                                    onMouseup={handleMouseUp}
                                >
                                    <Layer>
                                        {(activePage?.children || []).map((el) => {
                                            let element = { ...el };

                                            if (isPenTool) {
                                                element['locked'] = true
                                            } else {
                                                element['locked'] = el?.locked || false;
                                            }

                                            return (
                                                <EditorLayer el={element} setElement={setElement} stageRef={stageRef} />
                                            )
                                        })}
                                        {lines?.map((line, i) => (
                                            <Line
                                                key={i}
                                                points={line?.points}
                                                stroke={line?.color}
                                                strokeWidth={line?.size}
                                                opacity={line?.opacity}
                                                tension={0.5}
                                                lineCap={line?.cap}
                                                lineJoin="round"
                                            />
                                        ))}
                                    </Layer>
                                </Stage>
                            </div>
                        </div>
                    </>
                </PageContainer>
            </ProLayout>

            <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
        </>
    );
};