import { ConfigLineObject } from '../../view/utils/specification';

export const hasWallsCollision = (params: {
  object: ConfigLineObject;
  room: { width: number; length: number; height: number };
}): boolean => {
  if (
    params.object.options.x < 0 ||
    params.object.options.y < 0 ||
    params.object.options.z < 0
  ) {
    return true;
  }
  if (
    params.object.options.x + params.object.options.width >
    params.room.width
  ) {
    return true;
  }
  if (
    params.object.options.y + params.object.options.length >
    params.room.length
  ) {
    return true;
  }

  if (
    params.object.options.z + params.object.options.height >
    params.room.height
  ) {
    return true;
  }

  return false;
};
