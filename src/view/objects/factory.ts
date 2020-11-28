import { ConfigLineObject, ConfigObjectTypes } from '../utils/specification';
import { createCube } from './cube';
import { createPyramid } from './pyramid';

export const createRoomObject = (iso: any, params: ConfigLineObject) => {
  switch (params.type) {
    case ConfigObjectTypes.CUBOID:
      createCube(
        iso,
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
        iso,
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
