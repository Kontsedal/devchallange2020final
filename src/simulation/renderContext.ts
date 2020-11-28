export class RenderContext {
  private readonly element: HTMLCanvasElement;

  private readonly context: CanvasRenderingContext2D;

  private canvasWidth: number;

  private canvasHeight: number;

  private sizeChangeHandler: (() => void) | undefined;

  constructor(selector: string) {
    this.element = document.querySelector(selector) as HTMLCanvasElement;
    this.context = this.element.getContext('2d') as CanvasRenderingContext2D;
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
    this.canvasWidth = this.element.clientWidth;
    this.canvasHeight = this.element.clientHeight;

    window.addEventListener('resize', () => {
      this.element.width = window.innerWidth;
      this.element.height = window.innerHeight;
      this.canvasWidth = this.element.clientWidth;
      this.canvasHeight = this.element.clientHeight;
      if (typeof this.sizeChangeHandler === 'function') {
        this.sizeChangeHandler();
      }
    });
  }

  getWidth() {
    return this.canvasWidth;
  }

  getHeight() {
    return this.canvasHeight;
  }

  getCanvas() {
    return this.element;
  }

  onSizeChange(callback: () => void) {
    this.sizeChangeHandler = callback;
  }

  getContext() {
    return this.context;
  }

  clear() {
    this.getContext().clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}
