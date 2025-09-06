import {
    InputNumber,
    Slider,
    ColorPicker,
    Typography,
    Flex,
} from "antd";

const RectangleEdit = ({ selectedEl, setElement }) => {
    if (!selectedEl) return null;

    const update = (key, value) => {
        setElement(selectedEl?.id, (el) => ({ ...el, [key]: value }));
    };
 

    return (
        <>
            <>

                <Flex align="center" justify="space-between">
                    <Typography>Position X</Typography>
                    <InputNumber value={selectedEl?.x} onChange={(v) => update("x", v)} />
                </Flex>

                <Flex align="center" justify="space-between">
                    <Typography>Position Y</Typography>
                    <InputNumber value={selectedEl?.y} onChange={(v) => update("y", v)} />
                </Flex>

                <Flex align="center" justify="space-between">
                    <Typography>Width</Typography>
                    <InputNumber value={selectedEl?.width} onChange={(v) => update("width", v)} />
                </Flex>

                <Flex align="center" justify="space-between">
                    <Typography>Height</Typography>
                    <InputNumber value={selectedEl?.height} onChange={(v) => update("height", v)} />
                </Flex>


                <Flex align="center" justify="space-between">
                    <Typography>Stroke</Typography>
                    <ColorPicker value={selectedEl?.stroke || "#000"} onChange={(c) => update("stroke", c?.toHexString())} />
                </Flex>

                <Flex align="center" justify="space-between">
                    <Typography>Stroke Width</Typography>
                    <InputNumber value={selectedEl?.strokeWidth || 0} onChange={(v) => update("strokeWidth", v)} />
                </Flex>

                <Typography>Dash Style</Typography>
                <Flex align="center" justify="space-between">
                    <Typography>Dash length</Typography>
                    <InputNumber placeholder="Dash length" onChange={(v) => update("dash", [v, selectedEl?.dash?.[1] || 0])} />
                </Flex>

                <Flex align="center" justify="space-between">
                    <Typography>Dash length Gap</Typography>
                    <InputNumber placeholder="Gap" onChange={(v) => update("dash", [selectedEl?.dash?.[0] || 0, v])} />
                </Flex>

                <Typography>Opacity</Typography>
                <Slider min={0} max={1} step={0.05} value={selectedEl?.opacity ?? 1} onChange={(v) => update("opacity", v)} />

                <Flex align="center" justify="space-between">
                    <Typography>Corner Radius</Typography>
                    <InputNumber value={selectedEl?.cornerRadius || 0} onChange={(v) => update("cornerRadius", v)} />
                </Flex>

                <Typography>Shadow</Typography>
                <Flex align="center" justify="space-between">
                    <Typography>Shadow Color</Typography>
                    <ColorPicker value={selectedEl?.shadowColor || "#000"} onChange={(c) => update("shadowColor", c?.toHexString())} />
                </Flex>

                <Flex align="center" justify="space-between">
                    <Typography>Shadow Blur</Typography>
                    <InputNumber value={selectedEl?.shadowBlur || 0} onChange={(v) => update("shadowBlur", v)} />
                </Flex>


                <Flex align="center" justify="space-between">
                    <Typography>shadow Offset X</Typography>
                    <InputNumber value={selectedEl?.shadowOffsetX || 0} onChange={(v) => update("shadowOffsetX", v)} />
                </Flex>

                <Flex align="center" justify="space-between">
                    <Typography>shadow Offset Y</Typography>
                    <InputNumber value={selectedEl?.shadowOffsetY || 0} onChange={(v) => update("shadowOffsetY", v)} />
                </Flex>


                <Typography>Shadow Opacity</Typography>
                <Slider min={0} max={1} step={0.05} value={selectedEl?.shadowOpacity ?? 1} onChange={(v) => update("shadowOpacity", v)} />

            </>

            {/* Corner Radius */}
            <Typography>All Corner Radius</Typography>

            <InputNumber
                addonBefore="Top Left"
                value={Array?.isArray(selectedEl?.cornerRadius) ? selectedEl?.cornerRadius[0] : 0}
                onChange={(v) => {
                    let cr = Array?.isArray(selectedEl?.cornerRadius) ? [...selectedEl?.cornerRadius] : [0, 0, 0, 0];
                    cr[0] = v;
                    update("cornerRadius", cr);
                }}
            />

            <InputNumber
                addonBefore="Top Right"
                value={Array?.isArray(selectedEl?.cornerRadius) ? selectedEl?.cornerRadius[1] : 0}
                onChange={(v) => {
                    let cr = Array?.isArray(selectedEl?.cornerRadius) ? [...selectedEl?.cornerRadius] : [0, 0, 0, 0];
                    cr[1] = v;
                    update("cornerRadius", cr);
                }}
            />

            <InputNumber
                addonBefore="Bottom Left"
                value={Array?.isArray(selectedEl?.cornerRadius) ? selectedEl?.cornerRadius[3] : 0}
                onChange={(v) => {
                    let cr = Array?.isArray(selectedEl?.cornerRadius) ? [...selectedEl?.cornerRadius] : [0, 0, 0, 0];
                    cr[3] = v;
                    update("cornerRadius", cr);
                }}
            />


            <InputNumber
                addonBefore="Bottom Right"
                value={Array?.isArray(selectedEl?.cornerRadius) ? selectedEl?.cornerRadius[2] : 0}
                onChange={(v) => {
                    let cr = Array?.isArray(selectedEl?.cornerRadius) ? [...selectedEl?.cornerRadius] : [0, 0, 0, 0];
                    cr[2] = v;
                    update("cornerRadius", cr);
                }}
            />
        </>
    );
};

export default RectangleEdit;

