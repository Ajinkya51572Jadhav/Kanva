import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Popconfirm, Flex } from "antd";

import { FaRegCopy } from "react-icons/fa6";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { MdOutlineDelete, MdExposurePlus1 } from "react-icons/md";

import { setActiveIndex, setPopUp, setSelectedUniqueId } from "../redux/editorReducer";


export default function AddPage({ setPagesWithHistory }) {
    const dispatch = useDispatch();
    const { activeIndex, editorPages } = useSelector((state) => state?.editor || {});

    const handleSwitchPage = (idx) => {
        dispatch(setActiveIndex(idx));
        dispatch(setSelectedUniqueId(null));
        dispatch(setPopUp(false));
    };

    const addPage = () =>
        setPagesWithHistory((prev) => {
            const next = [
                ...prev,
                { id: prev?.length + 1, children: [], background: "#ffffff" },
            ];
            setTimeout(() => dispatch(setActiveIndex(next?.length - 1)), 0);
            return next;
        });

    const duplicatePage = (idx) =>
        setPagesWithHistory((prev) => {
            const cp = JSON.parse(JSON?.stringify(prev));
            const page = cp[idx];
            const copy = {
                ...JSON.parse(JSON.stringify(page)),
                id: cp?.length + 1,
            };
            cp?.splice(idx + 1, 0, copy);
            setTimeout(() => dispatch(setActiveIndex(idx + 1)), 0);
            return cp;
        });

    const deletePage = (idx) =>
        setPagesWithHistory((prev) => {
            const cp = [...prev];
            cp?.splice(idx, 1);
            const newIndex = Math.max(0, Math.min(cp?.length - 1, idx - 1));
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
            if (idx >= prev?.length - 1) return prev;
            const cp = [...prev];
            [cp[idx + 1], cp[idx]] = [cp[idx], cp[idx + 1]];
            setTimeout(() => dispatch(setActiveIndex(idx + 1)), 0);
            return cp;
        });

    return (
        <Flex align="center" justify="center" gap={10}>
            {editorPages && editorPages?.map((p, idx) => {
                const isActive = idx === activeIndex;

                const menuItems = [
                    {
                        key: "duplicate",
                        label: "Duplicate",
                        icon: <FaRegCopy size={20} />,
                        onClick: () => duplicatePage(idx),
                    },
                    {
                        key: "moveUp",
                        label: "Move Up",
                        icon: <BsArrowUp size={22} />,
                        disabled: idx === 0,
                        onClick: () => moveUp(idx),
                    },
                    {
                        key: "moveDown",
                        label: "Move Down",
                        icon: <BsArrowDown size={22} />,
                        disabled: idx === editorPages?.length - 1,
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
                        icon: <MdOutlineDelete size={25} color="red" />,
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

            <Button icon={<MdExposurePlus1 size={25} />} onClick={addPage} style={{
                width: 62,
                height: 62,
            }} />
        </Flex>
    );
};