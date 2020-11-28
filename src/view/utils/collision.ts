import {
  ConfigLineObject,
  ConfigObjectTypes,
} from './specification';

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
  if(getCollisions(target, objects).length) {
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

export const getCollisions = (target: ConfigLineObject, objects: ConfigLineObject[]) => {
  const collisions: ConfigLineObject[] = [];
  objects.filter(item => item !== target).forEach(obj => {
    if(hasCollision(target, obj)) {
      collisions.push(obj)
    }
  })
  return collisions;
}

export const hasCollision = (target: ConfigLineObject, object: ConfigLineObject) => {
  const targetRight = target.options.x + target.options.width;
  const targetDepth = target.options.y + target.options.length;
  const targetHeight = target.options.x + target.options.height;
  const objectRight = object.options.x + object.options.width;
  const objectDepth = object.options.y + object.options.length;
  const objectHeight = object.options.z + object.options.height;
  return !(
      target.options.x >= objectRight ||
      target.options.y >= objectDepth ||
      targetRight <= object.options.x ||
      targetDepth <= object.options.y ||
      target.options.z >= objectHeight ||
      targetHeight <= object.options.z
  )
}
