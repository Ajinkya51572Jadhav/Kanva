import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Empty, Flex, Space, Typography } from 'antd';
import { setPath } from '../redux/editorReducer';


import { GrTemplate } from "react-icons/gr";
import { PiTextAaLight } from "react-icons/pi";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { IoShapesOutline } from "react-icons/io5";
import { GrCloudUpload } from "react-icons/gr";
import { SlLayers } from "react-icons/sl";
import { PiResizeThin } from "react-icons/pi";
import { MdOutlineShapeLine } from "react-icons/md";

import Texxt from './Texxt';
import Photo from './Photo';
import Element from './Element';
import Upload from './Upload';
import Resize from './Resize';
import Banner from './Banner';
import EditingPopup from './EditingPopup';
import Layer from './Layer';
import Shape from './Shape';


const getIcon = (type) => {
    switch (type) {
        case "banner":
            return <GrTemplate style={{ fontSize: 20 }} />;
        case "text":
            return <PiTextAaLight style={{ fontSize: 20 }} />;
        case "photo":
            return <MdOutlinePhotoSizeSelectActual style={{ fontSize: 20 }} />;
        case "image":
            return <MdOutlinePhotoSizeSelectActual style={{ fontSize: 20 }} />;
        case "element":
            return <IoShapesOutline style={{ fontSize: 20 }} />;
        case "upload":
            return <GrCloudUpload style={{ fontSize: 20 }} />;
        case "layer":
            return <SlLayers style={{ fontSize: 20 }} />;
        case "resize":
            return <PiResizeThin style={{ fontSize: 20 }} />;
        case "rect":
            return <MdOutlineShapeLine style={{ fontSize: 20 }} />;
        default:
            return null;
    }
};


const Sidebar = ({ selectedEl, setElement, activePage, setPagesWithHistory, openMiniFor, stageRef }) => {
    const dispatch = useDispatch();
    const { path } = useSelector((state) => state?.editor ?? {});

    useEffect(() => {
        if (selectedEl !== undefined) {
            dispatch(setPath(undefined));
        };

        if (path === undefined && selectedEl === undefined) {
            dispatch(setPath("banner"));
        }

        if (selectedEl?.type === 'icon') {
            dispatch(setPath("element"));
        }


    }, [selectedEl]);


    return (
        <>
            <Card title={
                <>
                    <Flex align='center' justify='start' gap={5} style={{ textTransform: "capitalize" }}>
                        {getIcon(path || selectedEl?.type)} {path || selectedEl?.type || "sidebar"}
                    </Flex>
                </>
            }
                size="small"
                style={{ border: 'none', borderRadius: 0 }}
            >
                <>
                    {path !== undefined ? (
                        <>
                            {path === "banner" && <Banner setPagesWithHistory={setPagesWithHistory} />}

                            {path === "text" && <Texxt
                                setPagesWithHistory={setPagesWithHistory}
                                openMiniFor={openMiniFor} />}


                            {path === "photo" && <Photo setPagesWithHistory={setPagesWithHistory} />}

                            {path === "element" && <Element setPagesWithHistory={setPagesWithHistory} />}

                            {path === "shape" && <Shape
                                setPagesWithHistory={setPagesWithHistory}
                            />}


                            {path === "upload" && <Upload setPagesWithHistory={setPagesWithHistory} />}

                            {path === "resize" && <Resize stageRef={stageRef} />}

                            {path === "layer" && <Layer
                                elements={activePage?.children || []}
                                onToggleLock={(id) => {
                                    setElement(id, (el) => ({ ...el, locked: !el?.locked }));
                                    // dispatch(setPath('layer'));
                                }}
                                onToggleVisibility={(id) => {
                                    setElement(id, (el) => ({ ...el, visible: !el?.visible }));
                                    // dispatch(setPath('layer'));

                                }}
                                onReorder={(newChildren) => {
                                    setPagesWithHistory((pages) =>
                                        pages?.map((p) =>
                                            p?.id === activePage?.id ? { ...p, children: newChildren } : p
                                        )
                                    );
                                }}
                            />
                            }
                        </>
                    ) : (
                        <>  <EditingPopup
                            selectedEl={selectedEl}
                            setElement={setElement}
                            setPagesWithHistory={setPagesWithHistory}
                            openMiniFor={openMiniFor}
                            activePage={activePage} />
                        </>
                    )}
                </>

            </Card>
        </>
    )
}

export default Sidebar;