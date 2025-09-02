import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Space, Typography } from 'antd';
import { setPath } from '../redux/editorReducer';

import { Texxt } from './Texxt';
import { Photo } from './Photo';
import { Element } from './Element';
import { Upload } from './Upload';
import { Resize } from './Resize';
import { Banner } from './Banner';
import { EditingPopup } from './EditingPopup';
import { Layer } from './Layer';


const Sidebar = ({ selectedEl, setElement, activePage, setPagesWithHistory, openMiniFor, stageRef }) => {
    const dispatch = useDispatch();
    const { path } = useSelector((state) => state.editor);

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
                    <Space>
                        {/* add icon */}
                        <Typography>{path || selectedEl?.type || "sidebar"}</Typography>
                    </Space>
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


                            {path === "upload" && <Upload setPagesWithHistory={setPagesWithHistory} />}

                            {path === "resize" && <Resize stageRef={stageRef} />}

                            {path === "layer" && <Layer
                                elements={activePage.children || []}
                                onToggleLock={(id) => {
                                    setElement(id, (el) => ({ ...el, locked: !el.locked }));
                                    // dispatch(setPath('layer'));
                                }}
                                onToggleVisibility={(id) => {
                                    setElement(id, (el) => ({ ...el, visible: !el.visible }));
                                    // dispatch(setPath('layer'));

                                }}
                                onReorder={(newChildren) => {
                                    setPagesWithHistory((pages) =>
                                        pages.map((p) =>
                                            p.id === activePage.id ? { ...p, children: newChildren } : p
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