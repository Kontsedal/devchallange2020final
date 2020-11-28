import * as yup from 'yup';

const roomSchema = yup.object().shape({
  options: yup.object().shape({
    width: yup.number().required().positive().integer(),
    height: yup.number().required().positive().integer(),
    length: yup.number().required().positive().integer(),
  }),
});

export enum ConfigObjectTypes {
  CUBOID = 'cuboid',
  PYRAMID = 'square-pyramid',
  SPHERE = 'sphere',
  ROOM = 'room',
}
export type ConfigLineObject = {
  type: ConfigObjectTypes;
  options: {
    width: number;
    height: number;
    length: number;
    x: number;
    y: number;
    z: number;
  };
};

export const parseSpecification = async (
  specificationText: string
): Promise<ConfigLineObject[]> => {
  const normalizedText = specificationText.replace(/\s+/, ' ');
  const dataArray = normalizedText.split(/\n/);
  const paramsArray = dataArray.map((line) => line.split(' '));
  const result = paramsArray
    .map(parseConfigLine)
    .filter((item) => !!item) as ConfigLineObject[];

  const room = result.find((item) => item.type === ConfigObjectTypes.ROOM);
  await roomSchema.validate(room, { abortEarly: false });
  return result;
};

function parseConfigLine(paramsArray: string[]): ConfigLineObject | void {
  const objectType = paramsArray[0] as ConfigObjectTypes;
  const options = paramsArray.reduce((result, param, index) => {
    if (index === 0) {
      return result;
    }
    const paramArray = param.split('=');
    return { ...result, [paramArray[0]]: Number(paramArray[1]) };
  }, {}) as {
    width: number;
    height: number;
    length: number;
    x: number;
    y: number;
    z: number;
  };
  if (!(Object.values(ConfigObjectTypes) as string[]).includes(objectType)) {
    return;
  }
  if (typeof options.length === 'undefined') {
    options.length = options.width;
  }
  return {
    type: objectType,
    options,
  };
}
