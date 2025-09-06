import {
    InputNumber,
    Slider,
    ColorPicker,
    Typography,
    Flex,
    Switch,
} from "antd";

const TriangleEdit = ({ selectedEl, setElement }) => {
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
                <InputNumber value={selectedEl.y} onChange={(v) => update("y", v)} />
            </Flex>

            {/* Size */}
            <Flex align="center" justify="space-between">
                <Typography>Radius (size)</Typography>
                <InputNumber
                    value={selectedEl?.radius || 60}
                    onChange={(v) => update("radius", v)}
                />
            </Flex>

            {/* Rotation */}
            <Flex align="center" justify="space-between">
                <Typography>Rotation</Typography>
                <InputNumber
                    value={selectedEl?.rotation || 0}
                    onChange={(v) => update("rotation", v)}
                />
            </Flex>

            {/* Polygon sides (default 3 = triangle) */}
            <Flex align="center" justify="space-between">
                <Typography>Sides</Typography>
                <InputNumber
                    min={3}
                    max={12}
                    value={selectedEl?.sides || 3}
                    onChange={(v) => update("sides", v)}
                />
            </Flex>

            {/* Fill & Stroke */}
            <Flex align="center" justify="space-between">
                <Typography>Fill</Typography>
                <ColorPicker
                    value={selectedEl?.fill || "#fff"}
                    onChange={(c) => update("fill", c.toHexString())}
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
                    onChange={(v) => update("dash", [v, selectedEl?.dash?.[1] || 0])}
                />
            </Flex>

            <Flex align="center" justify="space-between">
                <Typography>Dash gap</Typography>
                <InputNumber
                    value={selectedEl?.dash?.[1] || 0}
                    onChange={(v) => update("dash", [selectedEl?.dash?.[0] || 0, v])}
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

            {/* Blur */}
            <Flex align="center" justify="space-between">
                <Typography>Blur</Typography>
                <InputNumber
                    value={selectedEl?.blurRadius || 0}
                    onChange={(v) => update("blurRadius", v)}
                />
            </Flex>

            {/* Shadow */}
            <Typography>Shadow</Typography>
            <Flex align="center" justify="space-between">
                <Typography>Shadow Color</Typography>
                <ColorPicker
                    value={selectedEl?.shadowColor || "#000"}
                    onChange={(c) => update("shadowColor", c?.toHexString())}
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

            {/* Lock / Visible */}
            <Flex align="center" justify="space-between" style={{ marginTop: 10 }}>
                <Typography>Locked</Typography>
                <Switch
                    checked={selectedEl?.locked || false}
                    onChange={(v) => update("locked", v)}
                />
            </Flex>

            <Flex align="center" justify="space-between">
                <Typography>Visible</Typography>
                <Switch
                    checked={selectedEl?.visible !== false}
                    onChange={(v) => update("visible", v)}
                />
            </Flex>
        </>
    );
};

export default TriangleEdit;
