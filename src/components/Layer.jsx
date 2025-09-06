import { useDispatch, useSelector } from "react-redux";
import { Button, Empty, message, Tooltip, Typography } from "antd";
import { DragSortTable } from "@ant-design/pro-components";

import { TbTextSize } from "react-icons/tb";
import { HiOutlinePhoto } from "react-icons/hi2";
import { LiaShapesSolid } from "react-icons/lia";
import { IoEyeOffOutline ,IoEyeOutline} from "react-icons/io5";
import { CiLock ,CiUnlock} from "react-icons/ci";

import { setSelectedUniqueId } from "../redux/editorReducer";

const getIcon = (type) => {
    switch (type) {
        case "text":
            return <TbTextSize size={20}/>;
        case "image":
            return <HiOutlinePhoto size={20}/>;
        case "svg":
            return <LiaShapesSolid size={24}/>;
        default:
            return <LiaShapesSolid size={24}/>;
    }
};

export default function Layer({ elements = [], onToggleLock, onToggleVisibility, onReorder }) {
    const dispatch = useDispatch();
    const { selectedUniqueId } = useSelector((state) => state?.editor ?? {});
    const [messageApi, contextHolder] = message.useMessage();



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
                            fontWeight: selectedUniqueId === record?.id ? 600 : 400,
                            color: selectedUniqueId === record?.id ? "#1890ff" : "inherit",
                        }}
                        onClick={() => dispatch(setSelectedUniqueId(record?.id))}
                    >
                        {getIcon(record?.type)}
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
                <div style={{ display: "flex", gap: 2 }}>
                    <Tooltip title={record?.visible ? "Hide" : "Show"}>
                        <Button
                            size="small"
                            type="text"
                            icon={record?.visible ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18}/>}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleVisibility?.(record?.id);
                            }}
                        />
                    </Tooltip>

                    <Tooltip title={record?.locked ? "Unlock" : "Lock"}>
                        <Button
                            size="small"
                            type="text"
                            icon={record?.locked ? <CiLock size={21} /> : <CiUnlock size={21} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleLock?.(record?.id);
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