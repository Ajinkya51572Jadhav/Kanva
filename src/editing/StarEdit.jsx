import {
    InputNumber,
    Slider,
    ColorPicker,
    Typography,
    Flex,
} from "antd";

const StarEdit = ({ selectedEl, setElement }) => {
    if (!selectedEl) return null;

    const update = (key, value) => {
        setElement(selectedEl?.id, (el) => ({ ...el, [key]: value }));
    };

    return (
        <>
            {/* Position */}
            <Flex align="center" justify="space-between">
                <Typography>Position X</Typography>
                <InputNumber value={selectedEl?.x} onChange={(v) => update("x", v)} />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Position Y</Typography>
                <InputNumber value={selectedEl?.y} onChange={(v) => update("y", v)} />
            </Flex>

            {/* Star features */}
            <Flex align="center" justify="space-between">
                <Typography>Points</Typography>
                <InputNumber
                    min={3}
                    max={20}
                    value={selectedEl?.numPoints || 5}
                    onChange={(v) => update("numPoints", v)}
                />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Inner Radius</Typography>
                <InputNumber
                    value={selectedEl?.innerRadius || 30}
                    onChange={(v) => update("innerRadius", v)}
                />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Outer Radius</Typography>
                <InputNumber
                    value={selectedEl?.outerRadius || 60}
                    onChange={(v) => update("outerRadius", v)}
                />
            </Flex>

            {/* Fill & Stroke */}
            <Flex align="center" justify="space-between">
                <Typography>Fill</Typography>
                <ColorPicker
                    value={selectedEl?.fill || "#fff"}
                    onChange={(c) => update("fill", c?.toHexString())}
                />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Stroke</Typography>
                <ColorPicker
                    value={selectedEl?.stroke || "#000"}
                    onChange={(c) => update("stroke", c?.toHexString())}
                />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Stroke Width</Typography>
                <InputNumber
                    value={selectedEl?.strokeWidth || 1}
                    onChange={(v) => update("strokeWidth", v)}
                />
            </Flex>

            {/* Dash Style */}
            <Typography>Dash Style</Typography>
            <Flex align="center" justify="space-between">
                <Typography>Dash length</Typography>
                <InputNumber
                    value={selectedEl?.dash?.[0] || 0}
                    onChange={(v) =>
                        update("dash", [v, selectedEl?.dash?.[1] || 0])
                    }
                />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Dash gap</Typography>
                <InputNumber
                    value={selectedEl?.dash?.[1] || 0}
                    onChange={(v) =>
                        update("dash", [selectedEl?.dash?.[0] || 0, v])
                    }
                />
            </Flex>

            {/* Opacity */}
            <Typography>Opacity</Typography>
            <Slider
                min={0}
                max={1}
                step={0.05}
                value={selectedEl?.opacity ?? 1}
                onChange={(v) => update("opacity", v)}
            />

            {/* Shadow */}
            <Typography>Shadow</Typography>
            <Flex align="center" justify="space-between">
                <Typography>Shadow Color</Typography>
                <ColorPicker
                    value={selectedEl?.shadowColor || "#000"}
                    onChange={(c) => update("shadowColor", c.toHexString())}
                />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Shadow Blur</Typography>
                <InputNumber
                    value={selectedEl?.shadowBlur || 0}
                    onChange={(v) => update("shadowBlur", v)}
                />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Shadow Offset X</Typography>
                <InputNumber
                    value={selectedEl?.shadowOffsetX || 0}
                    onChange={(v) => update("shadowOffsetX", v)}
                />
            </Flex>
            <Flex align="center" justify="space-between">
                <Typography>Shadow Offset Y</Typography>
                <InputNumber
                    value={selectedEl?.shadowOffsetY || 0}
                    onChange={(v) => update("shadowOffsetY", v)}
                />
            </Flex>
            <Typography>Shadow Opacity</Typography>
            <Slider
                min={0}
                max={1}
                step={0.05}
                value={selectedEl?.shadowOpacity ?? 1}
                onChange={(v) => update("shadowOpacity", v)}
            />
        </>
    );
};

export default StarEdit;
