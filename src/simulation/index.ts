import obelisk from 'obelisk.js';
import { CONFIG } from '../config';
import { ConfigLineObject } from '../view/utils/specification';
import { RenderContext } from './renderContext';
import { createFloor } from '../view/objects/floor';
import { normalizeNumber } from './utils/number';
import {createRoomObject} from "../view/objects/factory";
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
    const point = new obelisk.Point(
      this.renderContext.getWidth() / 2,
      this.renderContext.getHeight() / 2 -
        normalizeNumber(params.roomOptions.height) / 2
    );
    const pixelView = new obelisk.PixelView(
      this.renderContext.getCanvas(),
      point
    );
    createFloor(pixelView, {
      width: params.roomOptions.width,
      length: params.roomOptions.length,
    });
    params.objects.forEach(item => createRoomObject(pixelView, item))
  }
}
