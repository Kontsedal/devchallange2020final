import obelisk from 'obelisk.js';
import { ConfigLineObject, ConfigObjectTypes } from '../utils/specification';
import { createCube } from './cube';
import { createPyramid } from './pyramid';

export const createRoomObject = (
  pixelView: obelisk.PixelView,
  params: ConfigLineObject
) => {
  switch (params.type) {
    case ConfigObjectTypes.CUBOID:
      createCube(
        pixelView,
        params.options as {
          width: number;
          length: number;
          height: number;
          x: number;
          y: number;
          z: number;
        }
      );
      break;

    case ConfigObjectTypes.PYRAMID:
      createPyramid(
        pixelView,
        params.options as {
          width: number;
          length: number;
          height: number;
          x: number;
          y: number;
          z: number;
        }
      );
      break;
  }
};
