// @ts-ignore
import  {Shape, Point} from 'isomer'
import {normalizeNumber} from "../../simulation/utils/number";

export function createFloor(
    iso: any,
    params: { width: number; length: number }
) {
  iso.add(Shape.Prism(new Point(0, 0, -0.1), normalizeNumber(params.width), normalizeNumber(params.length), 0.1));
}
