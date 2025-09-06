import {
  InputNumber,
  Slider,
  ColorPicker,
  Typography,
  Flex,
  Select,
  Switch,
} from "antd";

const ArrowEdit = ({ selectedEl, setElement }) => {
  if (!selectedEl) return null;
  const update = (k, v) => setElement(selectedEl?.id, (el) => ({ ...el, [k]: v }));

  // helper for points editing
  const p = selectedEl?.points || [0, 0, 150, 0];

  return (
    <>
      {/* Position & Rotation */}
      <Flex align="center" justify="space-between">
        <Typography>X</Typography>
        <InputNumber value={selectedEl?.x || 0} onChange={(v) => update("x", v)} />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Y</Typography>
        <InputNumber value={selectedEl?.y || 0} onChange={(v) => update("y", v)} />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Rotation</Typography>
        <InputNumber
          value={selectedEl?.rotation || 0}
          onChange={(v) => update("rotation", v)}
        />
      </Flex>

      {/* Start / End points (local to the arrow group) */}
      <Typography style={{ marginTop: 8 }}>Points (local)</Typography>
      <Flex align="center" justify="space-between">
        <Typography>Start X</Typography>
        <InputNumber
          value={p[0]}
          onChange={(v) => update("points", [v, p[1], p[2], p[3]])}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Start Y</Typography>
        <InputNumber
          value={p[1]}
          onChange={(v) => update("points", [p[0], v, p[2], p[3]])}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>End X</Typography>
        <InputNumber
          value={p[2]}
          onChange={(v) => update("points", [p[0], p[1], v, p[3]])}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>End Y</Typography>
        <InputNumber
          value={p[3]}
          onChange={(v) => update("points", [p[0], p[1], p[2], v])}
        />
      </Flex>

      {/* Arrow head */}
      <Flex align="center" justify="space-between">
        <Typography>Pointer Length</Typography>
        <InputNumber
          value={selectedEl?.pointerLength || 15}
          onChange={(v) => update("pointerLength", v)}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Pointer Width</Typography>
        <InputNumber
          value={selectedEl?.pointerWidth || 15}
          onChange={(v) => update("pointerWidth", v)}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Arrow at Start</Typography>
        <Switch
          checked={!!selectedEl?.pointerAtBeginning}
          onChange={(v) => update("pointerAtBeginning", v)}
        />
      </Flex>

      {/* Stroke + Fill */}
      <Flex align="center" justify="space-between">
        <Typography>Fill</Typography>
        <ColorPicker
          value={selectedEl?.fill ?? selectedEl?.stroke ?? "#000"}
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
          value={selectedEl?.strokeWidth || 2}
          onChange={(v) => update("strokeWidth", v)}
        />
      </Flex>

      {/* Caps / Joins */}
      <Flex align="center" justify="space-between">
        <Typography>Line Cap</Typography>
        <Select
          value={selectedEl?.lineCap || "round"}
          onChange={(v) => update("lineCap", v)}
          options={[
            { label: "Butt", value: "butt" },
            { label: "Round", value: "round" },
            { label: "Square", value: "square" },
          ]}
          style={{ width: 120 }}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Line Join</Typography>
        <Select
          value={selectedEl?.lineJoin || "round"}
          onChange={(v) => update("lineJoin", v)}
          options={[
            { label: "Miter", value: "miter" },
            { label: "Round", value: "round" },
            { label: "Bevel", value: "bevel" },
          ]}
          style={{ width: 120 }}
        />
      </Flex>

      {/* Dash */}
      <Typography>Dash</Typography>
      <Flex align="center" justify="space-between">
        <Typography>Dash Length</Typography>
        <InputNumber
          value={selectedEl?.dash?.[0] || 0}
          onChange={(v) => update("dash", [v, selectedEl?.dash?.[1] || 0])}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Dash Gap</Typography>
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
        <Typography>Color</Typography>
        <ColorPicker
          value={selectedEl?.shadowColor || "#000"}
          onChange={(c) => update("shadowColor", c?.toHexString())}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Blur</Typography>
        <InputNumber
          value={selectedEl?.shadowBlur || 0}
          onChange={(v) => update("shadowBlur", v)}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Offset X</Typography>
        <InputNumber
          value={selectedEl?.shadowOffsetX || 0}
          onChange={(v) => update("shadowOffsetX", v)}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Offset Y</Typography>
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

      {/* Toggles */}
      <Flex align="center" justify="space-between" style={{ marginTop: 8 }}>
        <Typography>Stroke Scales on Resize</Typography>
        <Switch
          checked={!!selectedEl?.strokeScaleEnabled}
          onChange={(v) => update("strokeScaleEnabled", v)}
        />
      </Flex>
      <Flex align="center" justify="space-between">
        <Typography>Locked</Typography>
        <Switch
          checked={!!selectedEl?.locked}
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

export default ArrowEdit;
