import { Button, ColorPicker, Flex, InputNumber, Select, Typography, Slider } from 'antd';

import { CiTextAlignLeft, CiTextAlignCenter, CiTextAlignRight } from "react-icons/ci";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa6";
import { ImTextHeight } from "react-icons/im";

const TextEdite = ({ selectedEl, setElement, toggle }) => {
    return (
        <>
            <Typography style={{ padding: 5 }}>Font Size</Typography>
            <InputNumber style={{ padding: 5 }} min={6} value={selectedEl?.fontSize || 16} addonBefore={<ImTextHeight size={16} />}
                onChange={(value) =>
                    setElement(selectedEl?.id, (el) => ({
                        ...el,
                        fontSize: value || 16,
                    }))
                }
            />

            <Typography style={{ padding: 5 }}>Font Align</Typography>
            <Flex style={{ padding: 5 }} gap={10} wrap align='center' justify='start'>
                <Button type={selectedEl?.align === "left" ? "primary" : "default"} icon={<CiTextAlignLeft size={22} color='gray' />}
                    onClick={() => setElement(selectedEl?.id, (el) => ({ ...el, align: "left" }))}
                />
                <Button type={selectedEl?.align === "center" ? "primary" : "default"} icon={<CiTextAlignCenter size={22} color='gray' />}
                    onClick={() =>
                        setElement(selectedEl?.id, (el) => ({
                            ...el,
                            align: "center",
                        }))
                    }
                />
                <Button type={selectedEl?.align === "right" ? "primary" : "default"} icon={<CiTextAlignRight size={22} color='gray' />}
                    onClick={() =>
                        setElement(selectedEl?.id, (el) => ({ ...el, align: "right" }))
                    }
                />
            </Flex>

            <Typography style={{ padding: 5 }}>Font Style</Typography>
            <Flex style={{ padding: 5 }} gap={10} wrap align='center' justify='start'>
                <Button type={selectedEl?.bold ? "primary" : "default"} icon={<FaBold size={20} color='gray' />} onClick={() => toggle("bold")} />
                <Button type={selectedEl?.italic ? "primary" : "default"} icon={<FaItalic size={20} color='gray' />} onClick={() => toggle("italic")} />
                <Button type={selectedEl?.underline ? "primary" : "default"} icon={<FaUnderline size={20} color='gray' />} onClick={() => toggle("underline")} />
                <Button type={selectedEl?.lineThrough ? "primary" : "default"} icon={<FaStrikethrough size={20} color='gray' />} onClick={() => toggle("lineThrough")} />
            </Flex>

            <Typography style={{ padding: 5 }}>Font Case</Typography>
            <Select style={{ width: "100%", padding: 5 }} size='large' value={selectedEl?.textTransform || "Font Style"} onChange={(value) => setElement(selectedEl?.id, (el) => ({
                ...el,
                textTransform: value,
            }))}>
                {["lowercase", "uppercase", "none"].map((t) => (
                    <Select.Option key={t} value={t}>
                        {t}
                    </Select.Option>
                ))}
            </Select>


            <Typography style={{ padding: 5 }}>Font Stroke</Typography>
            <Flex style={{ padding: 5 }} gap={10} wrap justify='space-between'>
                <ColorPicker value={selectedEl?.stroke || "#000"}
                    onChange={(c) => setElement(selectedEl?.id, (el) => ({ ...el, stroke: c.toHexString() }))}
                />
                <InputNumber min={0} value={selectedEl?.strokeWidth || 0}
                    onChange={(val) =>
                        setElement(selectedEl?.id, (el) => ({
                            ...el,
                            strokeWidth: val,
                        }))
                    }
                />
            </Flex>

            <Typography style={{ padding: 5 }}>Line Height</Typography>
            <Slider min={0.5} max={3} step={0.1} value={selectedEl?.lineHeight || 1}
                onChange={(val) => setElement(selectedEl?.id, (el) => ({ ...el, lineHeight: val }))}
            />

            <Typography style={{ padding: 5 }}>Letter Spacing</Typography>
            <Slider min={-5} max={20} step={0.5} value={selectedEl?.letterSpacing || 0}
                onChange={(val) => setElement(selectedEl?.id, (el) => ({ ...el, letterSpacing: val }))}
            />

            <Flex style={{ padding: 5 }} align='center' gap={10} justify='space-between'>
                <Typography>Padding</Typography>
                <InputNumber min={0} value={selectedEl?.padding || 0}
                    onChange={(val) => setElement(selectedEl?.id, (el) => ({ ...el, padding: val }))}
                />
            </Flex>

            <Flex style={{ padding: 5 }} align='center' gap={10} justify='space-between'>
                <Typography>Shadow</Typography>
                <ColorPicker value={selectedEl?.shadowColor || "#000"}
                    onChange={(c) => setElement(selectedEl?.id, (el) => ({ ...el, shadowColor: c.toHexString() }))}
                />
            </Flex>

            <Flex style={{ padding: 5 }} align='center' gap={10} justify='space-between'>
                <Typography>Blur</Typography>
                <InputNumber min={0} value={selectedEl?.shadowBlur || 0}
                    onChange={(val) => setElement(selectedEl?.id, (el) => ({ ...el, shadowBlur: val }))}
                />
            </Flex>

            <Flex style={{ padding: 5 }} align='center' gap={10} justify='space-between'>
                <Typography>Offset X</Typography>
                <InputNumber value={selectedEl?.shadowOffsetX || 0}
                    onChange={(val) =>
                        setElement(selectedEl?.id, (el) => ({
                            ...el,
                            shadowOffsetX: val,
                        }))}
                />
            </Flex>

            <Flex style={{ padding: 5 }} align='center' gap={10} justify='space-between'>
                <Typography>Offset Y</Typography>
                <InputNumber value={selectedEl?.shadowOffsetY || 0}
                    onChange={(val) =>
                        setElement(selectedEl?.id, (el) => ({
                            ...el,
                            shadowOffsetY: val,
                        }))
                    }
                />
            </Flex>

            <Typography style={{ padding: 5 }}>Opacity</Typography>
            <Slider min={0} max={1} step={0.05} value={selectedEl?.shadowOpacity || 1}
                onChange={(val) =>
                    setElement(selectedEl?.id, (el) => ({
                        ...el,
                        shadowOpacity: val,
                    }))
                }
            />
        </>
    )
}
export default TextEdite;