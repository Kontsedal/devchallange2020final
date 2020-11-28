export const pipe = (...fns: ((arg: any) => any)[]) => (arg: any) =>
  fns.reduce((result, fn) => fn(result), arg);

export const repeat = (repeatTimes: number, cb: (index: number) => void) =>
  new Array(repeatTimes).fill(0).forEach((_, index) => cb(index));
