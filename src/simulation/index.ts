// @ts-ignore
import Isomer from 'isomer';
import { orderBy } from 'lodash';
import { CONFIG } from '../config';
import { ConfigLineObject } from '../view/utils/specification';
import { RenderContext } from './renderContext';
import { createFloor } from './objects/floor';
import { createRoomObject } from './objects/factory';
import { getTwoPointsDistance } from './utils/math';
import { createWalls } from './objects/walls';

// @ts-ignore
type RenderParams = {
  roomOptions: {
    width: number;
    height: number;
    length: number;
  };
  objects: ConfigLineObject[];
};
export class Simulation {
  private previousRenderParams: RenderParams | undefined;

  private renderContext: RenderContext;

  constructor() {
    this.renderContext = new RenderContext(CONFIG.CANVAS_SELECTOR);
  }

  init() {
    this.renderContext.onSizeChange(this.render.bind(this));
  }

  render(params: RenderParams | undefined = this.previousRenderParams) {
    if (!params) {
      return;
    }
    this.renderContext.clear();

    this.previousRenderParams = params;
    const iso = new Isomer(this.renderContext.getCanvas());
    createFloor(iso, params.roomOptions);
    const sortedObjects = orderBy(
      params.objects,
      ({ options }) =>
        getTwoPointsDistance(
          { x: 0, y: 0, z: 100 },
          { x: options.x, y: options.y, z: options.z }
        ),
      ['desc']
    );
    sortedObjects.forEach((item) => createRoomObject(iso, item));
    createWalls(iso, params.roomOptions);
  }
}
