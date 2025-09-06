import { InputNumber, Slider, Button, Switch, Divider, Typography, Flex, Tooltip, ColorPicker } from "antd";

const ImageEdit = ({ selectedEl, setElement }) => {
    if (selectedEl?.type !== "image") return null;

    return (
        <>
            <Divider>Size</Divider>
            <Flex align="center" justify="space-between">
                <Typography>Width</Typography>
                <InputNumber min={10} value={selectedEl?.width} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, width: v }))} />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Height</Typography>
                <InputNumber min={10} value={selectedEl?.height} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, height: v }))} />
            </Flex>

            <Divider>Opacity</Divider>
            <Slider min={0} max={1} step={0.05} value={selectedEl?.opacity ?? 1} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, opacity: v }))} />

            <Divider>Flip</Divider>
            <Flex align="center" justify="space-between">
                <Button onClick={() => setElement(selectedEl?.id, (el) => ({ ...el, flipH: !el?.flipH }))}>Flip H</Button>
                <Button onClick={() => setElement(selectedEl?.id, (el) => ({ ...el, flipV: !el.flipV }))}>Flip V</Button>
            </Flex>

            <Divider>Effects</Divider>
            <Flex align="center" justify="space-between">
                <Tooltip title="Grayscale">
                    <Switch checked={selectedEl?.grayscale} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, grayscale: v }))} />
                </Tooltip>

                <Tooltip title="Sepia">
                    <Switch checked={selectedEl?.sepia} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, sepia: v }))} />
                </Tooltip>
            </Flex>

            <Divider>Adjustments</Divider>

            <Typography>Blur</Typography>
            <Slider min={0} max={20} value={selectedEl?.blur || 0} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, blur: v }))} />

            <Typography>Brightness</Typography>
            <Slider min={-1} max={1} step={0.1} value={selectedEl?.brightness || 0} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, brightness: v }))} />

            <Typography>Contrast</Typography>
            <Slider min={-100} max={100} value={selectedEl?.contrast || 0} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, contrast: v }))} />

            <Typography>Saturation</Typography>
            <Slider min={-2} max={2} step={0.1} value={selectedEl?.saturation || 0} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, saturation: v }))} />

            <Divider>Border</Divider>
            <Flex align="center" justify="space-between">
                <Tooltip title="Border Color">
                    <ColorPicker value={selectedEl?.borderColor || "#000"} onChange={(value) => setElement(selectedEl?.id, (el) => ({ ...el, borderColor: value.toRgbString() }))} />
                </Tooltip>

                <Tooltip title="Border Width">
                    <InputNumber value={selectedEl?.borderWidth || 0} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, borderWidth: v }))} />
                </Tooltip>
            </Flex>
            <Divider>Corner Radius</Divider>
            <Slider
                min={0}
                max={100}
                value={selectedEl?.cornerRadius || 0}
                onChange={(v) =>
                    setElement(selectedEl?.id, (el) => ({ ...el, cornerRadius: v }))
                }
            />

            <Divider>Shadow</Divider>
            <Flex align="center" justify="space-between">
                <Typography>Shadow Color</Typography>
                <ColorPicker value={selectedEl?.shadowColor || "#000"} onChange={(value) => setElement(selectedEl?.id, (el) => ({ ...el, shadowColor: value?.toRgbString() }))} />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Shadow Blur</Typography>
                <InputNumber value={selectedEl?.shadowBlur || 0} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, shadowBlur: v }))} />
            </Flex>

            <Typography>shadow Opacity</Typography>
            <Slider min={0} max={1} step={0.05} value={selectedEl?.shadowOpacity || 0} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, shadowOpacity: v }))} />

            <Flex align="center" justify="space-between">
                <Typography>OffsetX</Typography>
                <InputNumber value={selectedEl?.shadowOffsetX || 0} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, shadowOffsetX: v }))} />
            </Flex>

            <Flex align="center" justify="space-between">
                <Typography>OffsetY</Typography>
                <InputNumber value={selectedEl?.shadowOffsetY || 0} onChange={(v) => setElement(selectedEl?.id, (el) => ({ ...el, shadowOffsetY: v }))} />
            </Flex>
        </>
    );
};

export default ImageEdit;