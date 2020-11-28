import {
  ConfigLineObject,
  ConfigObjectTypes,
} from '../../view/utils/specification';

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

export const isGonnaFall = (
  target: ConfigLineObject,
  objects: ConfigLineObject[]
) => {
  if(target.options.z === 0) {
    return false
  }
  return !hasFoundationObject(target, objects)
};

export const hasFoundationObject = (
  target: ConfigLineObject,
  objects: ConfigLineObject[]
) => {
  const restObjects = objects
    .filter((item) => item !== target)
    .filter((item) => item.type === ConfigObjectTypes.CUBOID)
    .filter(
      (item) => item.options.z + item.options.height === target.options.z
    );
  let result = false;

  restObjects.forEach((platform) => {
    const targetRight = target.options.x + target.options.width;
    const targetDepth = target.options.y + target.options.length;
    const platformRight = platform.options.x + platform.options.width;
    const platformDepth = platform.options.y + platform.options.length;
    if (
      !(
        target.options.x > platformRight ||
        target.options.y > platformDepth ||
        targetRight < platform.options.x ||
        targetDepth < platform.options.y
      )
    ) {
      result = true;
    }
  });
  return result;
};
