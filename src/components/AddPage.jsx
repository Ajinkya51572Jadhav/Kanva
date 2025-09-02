import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveIndex, setPopUp, setSelectedUniqueId } from "../redux/editorReducer";
import { Typography, Button, Dropdown, Popconfirm, Card, Flex } from "antd";
import { PlusOutlined, CopyOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, MoreOutlined } from "@ant-design/icons";

const { Text } = Typography;


export const AddPage = ({ setPagesWithHistory }) => {
    const dispatch = useDispatch();
    const { activeIndex, editorPages, canvasSize } = useSelector(
        (state) => state.editor
    );

    const handleSwitchPage = (idx) => {
        dispatch(setActiveIndex(idx));
        dispatch(setSelectedUniqueId(null));
        dispatch(setPopUp(false));
    };

    const addPage = () =>
        setPagesWithHistory((prev) => {
            const next = [
                ...prev,
                { id: prev.length + 1, children: [], background: "#ffffff" },
            ];
            setTimeout(() => dispatch(setActiveIndex(next.length - 1)), 0);
            return next;
        });

    const duplicatePage = (idx) =>
        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON.stringify(prev));
            const page = cp[idx];
            const copy = {
                ...JSON.parse(JSON.stringify(page)),
                id: cp.length + 1,
            };
            cp.splice(idx + 1, 0, copy);
            setTimeout(() => dispatch(setActiveIndex(idx + 1)), 0);
            return cp;
        });

    const deletePage = (idx) =>
        setPagesWithHistory((prev) => {
            if (prev.length <= 1) return prev;
            const cp = [...prev];
            cp.splice(idx, 1);
            const newIndex = Math.max(0, Math.min(cp.length - 1, idx - 1));
            setTimeout(() => dispatch(setActiveIndex(newIndex)), 0);
            return cp;
        });

    const moveUp = (idx) =>
        setPagesWithHistory((prev) => {
            if (idx <= 0) return prev;
            const cp = [...prev];
            [cp[idx - 1], cp[idx]] = [cp[idx], cp[idx - 1]];
            setTimeout(() => dispatch(setActiveIndex(idx - 1)), 0);
            return cp;
        });

    const moveDown = (idx) =>
        setPagesWithHistory((prev) => {
            if (idx >= prev.length - 1) return prev;
            const cp = [...prev];
            [cp[idx + 1], cp[idx]] = [cp[idx], cp[idx + 1]];
            setTimeout(() => dispatch(setActiveIndex(idx + 1)), 0);
            return cp;
        });

    return (
        <Flex align="center" justify="center" gap={10}>
            {editorPages.map((p, idx) => {
                const isActive = idx === activeIndex;

                const menuItems = [
                    {
                        key: "duplicate",
                        label: "Duplicate",
                        icon: <CopyOutlined />,
                        onClick: () => duplicatePage(idx),
                    },
                    {
                        key: "moveUp",
                        label: "Move Up",
                        icon: <ArrowUpOutlined />,
                        disabled: idx === 0,
                        onClick: () => moveUp(idx),
                    },
                    {
                        key: "moveDown",
                        label: "Move Down",
                        icon: <ArrowDownOutlined />,
                        disabled: idx === editorPages.length - 1,
                        onClick: () => moveDown(idx),
                    },
                    {
                        key: "delete",
                        label: (
                            <Popconfirm
                                title="Delete this page?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => deletePage(idx)}
                            >
                                <span style={{ color: "red" }}>
                                    Delete
                                </span>
                            </Popconfirm>
                        ),
                        icon: <DeleteOutlined style={{ color: "red" }} />,
                    },
                ];

                return (
                    <div key={p?.id ?? idx}>
                        {/* settings popup */}
                        <Dropdown

                            menu={{ items: menuItems }}
                            placement="top"
                            trigger={["hover"]}
                        >
                            <Button onClick={() => handleSwitchPage(idx)} style={{
                                width: 62,
                                height: 62,
                                border: isActive ? "2px solid #1890ff" : "1px solid rgba(0,0,0,0.08)",
                            }} >Page {p?.id ?? idx + 1}</Button>
                        </Dropdown>
                    </div>
                );
            })}

            <Button icon={<PlusOutlined style={{ fontSize: 20 }} />} onClick={addPage} style={{
                width: 62,
                height: 62,
            }} />
        </Flex>
    );
};

export default AddPage;

// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { setActiveIndex, setPopUp, setSelectedUniqueId } from '../redux/editorReducer';
// import { Button, Card } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// export const AddPage = ({ setPagesWithHistory }) => {
//     const { activeIndex, editorPages } = useSelector((state) => state.editor);
//     const dispatch = useDispatch();

//     // Page switching: preserve selection & close mini
//     const handleSwitchPage = (idx) => {
//         dispatch(setActiveIndex(idx));
//         dispatch(setSelectedUniqueId(null));
//         dispatch(setPopUp(false));
//     };

//     // Adding a page must push history
//     const addPage = () => {
//         setPagesWithHistory((prev) => {
//             const next = [...prev, { id: prev.length + 1, children: [], background: "#ffffff" }];
//             setTimeout(() => dispatch(setActiveIndex(next.length - 1)), 0);
//             return next;
//         });
//     };
//     return (
//         <>
//             <Card title="Pages" size="small" style={{ marginBottom: 12, borderRadius: 8 }} bodyStyle={{ padding: "12px 16px" }} >
//                 {editorPages.map((p, idx) => (
//                     <button key={idx + p?.id} onClick={() => handleSwitchPage(idx)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", background: idx === activeIndex ? "#e9e5ff" : "#f7f7f7", fontWeight: 600 }}>
//                         Page {p?.id ?? idx + 1}
//                     </button>
//                 ))}
//                 <Button
//                     type="dashed"
//                     block
//                     icon={<PlusOutlined />}
//                     onClick={addPage}
//                     style={{
//                         borderRadius: 8,
//                         fontWeight: 600,
//                     }}
//                 >
//                     Add Page
//                 </Button>
//             </Card>
//         </>
//     )
// }
