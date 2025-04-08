export const sectorLabels = [
  "top",
  "topRight",
  "right",
  "bottomRight",
  "bottom",
  "bottomLeft",
  "left",
  "topLeft",
  "center",
] as const;

export type Sector = (typeof sectorLabels)[number];

export const angleConfigs = {
  landscape: {
    baseAngle: 130,
    sectorAngles: [80, 115, 145, 180, 260, 295, 325, 360],
    centerOffsetRadius: 150,
  },
  portrait: {
    baseAngle: 112.5,
    sectorAngles: [45, 90, 135, 180, 225, 270, 315, 360],
    centerOffsetRadius: 120,
  },
};

export function getSectorByAngle(
  cx: number,
  cy: number,
  mx: number,
  my: number,
  isPortrait: boolean
): Sector | null {
  const dx = mx - cx;
  const dy = my - cy;

  const config = isPortrait ? angleConfigs.portrait : angleConfigs.landscape;

  const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
  if (distanceFromCenter < config.centerOffsetRadius) return "center";

  // Calculate angle from the center to mouse position in degrees
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  // Normalize angle to range 0–360 and apply base rotation offset
  angle = (angle + 360 + config.baseAngle) % 360;

  const sectorIndex = config.sectorAngles.findIndex((limit) => angle < limit);
  return sectorLabels[sectorIndex >= 0 ? sectorIndex : 0];
}
