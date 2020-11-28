import {
  ConfigLineObject,
  ConfigObjectTypes,
} from '../../view/utils/specification';
import { createCube } from './cube';
import { createPyramid } from './pyramid';
import {createSphere} from "./sphere";

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
    case ConfigObjectTypes.SPHERE:
      createSphere(
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
