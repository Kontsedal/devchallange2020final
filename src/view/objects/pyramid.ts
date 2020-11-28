// @ts-ignore
import  {Shape, Point, Color} from 'isomer'
import { normalizeNumber } from '../../simulation/utils/number';

export function createPyramid(
  iso: any,
  params: {
    width: number;
    length: number;
    height: number;
    x: number;
    y: number;
    z: number;
  }
) {
    const color = new Color(204, 30, 190, 0.9);
    iso.add(
        Shape.Pyramid(
            new Point(
                normalizeNumber(params.x),
                normalizeNumber(params.y),
                normalizeNumber(params.z)
            ),
            normalizeNumber(params.length),
            normalizeNumber(params.length),
            normalizeNumber(params.height)
        ),
        color
    );
}
