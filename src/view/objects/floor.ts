import obelisk from 'obelisk.js';
import { normalizeNumber } from '../../simulation/utils/number';
import {CONFIG} from "../../config";

export function createFloor(
  pixelView: obelisk.PixelView,
  params: { width: number; length: number }
) {
  const cubeColor = new obelisk.CubeColor();
  const dimensionCube = new obelisk.CubeDimension(
    normalizeNumber(params.width),
    normalizeNumber(params.length),
    CONFIG.FLOOR_THICKNESS
  );
  pixelView.renderObject(new obelisk.Cube(dimensionCube, cubeColor, true), new obelisk.Point3D(
      0,
      0,
      -CONFIG.FLOOR_THICKNESS
  ));
}
