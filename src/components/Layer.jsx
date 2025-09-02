import {
    AppstoreOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    FontSizeOutlined,
    PictureOutlined,
    LockOutlined,
    UnlockOutlined,
} from "@ant-design/icons";
import { DragSortTable } from "@ant-design/pro-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUniqueId } from "../redux/editorReducer";
import { Button, Empty, message, Tooltip, Typography } from "antd";

export const Layer = ({ elements = [], onToggleLock, onToggleVisibility, onReorder }) => {
    const dispatch = useDispatch();
    const { selectedUniqueId } = useSelector((state) => state.editor);
    const [messageApi, contextHolder] = message.useMessage();

    const getIcon = (type) => {
        switch (type) {
            case "text":
                return <FontSizeOutlined />;
            case "image":
                return <PictureOutlined />;
            case "svg":
                return <AppstoreOutlined />;
            default:
                return <AppstoreOutlined />;
        }
    };

    const columns = [
        {
            dataIndex: "sort",
        },
        {
            dataIndex: "name",
            className: "drag-visible",
            render: (_, record) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            cursor: "pointer",
                            fontWeight: selectedUniqueId === record.id ? 600 : 400,
                            color: selectedUniqueId === record.id ? "#1890ff" : "inherit",
                        }}
                        onClick={() => dispatch(setSelectedUniqueId(record.id))}
                    >
                        {getIcon(record.type)}
                        <Typography.Text ellipsis={{ tooltip: record?.text || record?.type || record?.id }}>
                            {record?.text?.slice(0, 12) ||
                                record?.type?.slice(0, 12) ||
                                record?.id?.slice(0, 12) ||
                                "N/A"}
                        </Typography.Text>
                    </div>
                );
            },
        },
        {
            dataIndex: "actions",
            align: "right",
            render: (_, record) => (
                <div style={{ display: "flex", gap: 4 }}>
                    <Tooltip title={record.visible ? "Hide" : "Show"}>
                        <Button
                            size="small"
                            type="text"
                            icon={record.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleVisibility?.(record.id);
                            }}
                        />
                    </Tooltip>

                    <Tooltip title={record.locked ? "Unlock" : "Lock"}>
                        <Button
                            size="small"
                            type="text"
                            icon={record.locked ? <LockOutlined /> : <UnlockOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleLock?.(record.id);
                            }}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>

            {contextHolder}
            <DragSortTable
                rowKey="id"
                pagination={false}
                dataSource={elements}
                columns={columns}
                dragSortKey="sort"
                search={false}
                toolBarRender={false}
                locale={{
                    emptyText: <Empty description="No Layer" />,
                }}
                onDragSortEnd={(beforeIndex, afterIndex, newDataSource) => {
                    messageApi.success({ content: "Sort Success", duration: 1 });
                    // only update state if order actually changed
                    if (beforeIndex !== afterIndex) {
                        onReorder?.(newDataSource);
                    }
                }}
            />
        </>
    );
};





// import { AppstoreOutlined, EyeInvisibleOutlined, EyeOutlined, FontSizeOutlined, InboxOutlined, LockOutlined, MenuOutlined, PictureOutlined, UnlockOutlined } from "@ant-design/icons";
// import { DragSortTable } from "@ant-design/pro-components";
// import { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedUniqueId } from "../redux/editorReducer";
// import { Button, Empty, message, Tooltip, Typography } from "antd";

// export const Layer = ({ elements = [], onToggleLock, onToggleVisibility, onReorder }) => {
//     const dispatch = useDispatch();
//     const actionRef = useRef();
//     const { selectedUniqueId } = useSelector((state) => state.editor);

//     const getIcon = (type) => {
//         switch (type) {
//             case "text": return <FontSizeOutlined />;
//             case "image": return <PictureOutlined />;
//             case "svg": return <AppstoreOutlined />;
//             default: return <AppstoreOutlined />;
//         }
//     };

//     const columns = [
//         {
//             dataIndex: "sort",
//         },
//         {
//             dataIndex: "name",
//             className: "drag-visible",
//             render: (_, record) => {
//                 return (
//                     <div
//                         style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 8,
//                             cursor: "pointer",
//                             fontWeight: selectedUniqueId === record.id ? 600 : 400,
//                             color: selectedUniqueId === record.id ? "#1890ff" : "inherit",
//                         }}
//                         onClick={() => dispatch(setSelectedUniqueId(record.id))}
//                     >
//                         {getIcon(record.type)}
//                         <Typography style={{ maxWidth: 140 }}>
//                             {record?.text?.slice(0, 12) || record?.type?.slice(0, 12) || record?.id?.slice(0, 12) || "N/A"}
//                         </Typography>
//                     </div>
//                 )
//             },
//         },
//         {
//             dataIndex: "actions",
//             align: "right",
//             render: (_, record) => (
//                 <div style={{ display: "flex", gap: 4 }}>
//                     <Tooltip title={record.visible ? "Hide" : "Show"}>
//                         <Button size="small"
//                             type="text"
//                             icon={record.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 onToggleVisibility(record.id);
//                             }}
//                         />
//                     </Tooltip>

//                     <Tooltip title={record.locked ? "Unlock" : "Lock"}>
//                         <Button
//                             size="small"
//                             type="text"
//                             icon={record.locked ? <LockOutlined /> : <UnlockOutlined />}
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 onToggleLock(record.id);
//                             }}
//                         />
//                     </Tooltip>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <DragSortTable
//             actionRef={actionRef}
//             rowKey="id"
//             pagination={false}
//             dataSource={elements.length > 0 ? elements : []}
//             columns={columns}
//             dragSortKey="sort"
//             search={false}
//             toolBarRender={false}
//             locale={{
//                 emptyText: (<Empty description={'No Layer'} />),
//             }}
//             onDragSortEnd={(beforeIndex, afterIndex, newDataSource) => {
//                 message.success({ content: "Sort Sucess", duration: 1000 })
//                 onReorder?.(newDataSource);
//             }}
//         />
//     );
// };