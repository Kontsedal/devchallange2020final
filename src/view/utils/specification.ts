export enum ConfigObjectTypes {
  CUBOID = 'cuboid',
  PYRAMID = 'square-pyramid',
  ROOM = 'room',
}
export type ConfigLineObject = { type: ConfigObjectTypes; options: { [key: string]: number } }

export const parseSpecification = (
  specificationText: string
): ConfigLineObject[] => {
  const normalizedText = specificationText.replace(/\s+/, ' ');
  const dataArray = normalizedText.split(/\n/);
  const paramsArray = dataArray.map((line) => line.split(' '));
  return paramsArray.map(parseConfigLine).filter(item => !!item) as ConfigLineObject[]
};

function parseConfigLine(
  paramsArray: string[]
): ConfigLineObject | void {
  const objectType = paramsArray[0] as ConfigObjectTypes;
  const options = paramsArray.reduce((result, param, index) => {
    if (index === 0) {
      return result;
    }
    const paramArray = param.split('=');
    return { ...result, [paramArray[0]]: Number(paramArray[1]) };
  }, {});
  if (!(Object.values(ConfigObjectTypes) as string[]).includes(objectType)) {
    return;
  }
  return {
    type: objectType,
    options,
  };
}
