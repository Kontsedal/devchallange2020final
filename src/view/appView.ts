import { Component } from './component';
import { Simulation } from '../simulation';
import { EnhancedDomElement, enhanceDom } from './utils/dom';
import './index.scss';
import {
  ConfigLineObject,
  ConfigObjectTypes,
  parseSpecification,
} from './utils/specification';
import { hasWallsCollision, isGonnaFall } from '../simulation/utils/collision';

type State = {
  roomOptions: {
    width: number;
    height: number;
    length: number;
  };
  objects: ConfigLineObject[];
  errors: string[];
  specification: string;
};

const SELECTORS = {
  specInput: '.js-spec-input',
  totalVolume: '.js-total-volume',
  objectsVolume: '.js-objects-volume',
  errors: '.js-errors',
  specification: '.js-specification',
} as const;

export class AppView extends Component<State> {
  private elements: Record<
    keyof typeof SELECTORS | string,
    EnhancedDomElement
  > = {};

  private simulation: Simulation;

  constructor(simulation: Simulation) {
    super({
      roomOptions: {
        width: 20,
        height: 20,
        length: 20,
      },
      objects: [],
      errors: [],
      specification: '',
    });
    this.simulation = simulation;
  }

  async init() {
    this.attachEventListeners();
    await this.simulation.init();
    this.renderSimulation();
    this.render();
  }

  setSpec(specString: string) {
    let spec: ConfigLineObject[];
    try {
      spec = parseSpecification(specString);
    } catch (error) {
      this.setState({
        errors: [`Failed to parse spec text. Error: ${JSON.stringify(error)}`]
      });
      return;
    }

    const room = spec.find((item) => item.type === ConfigObjectTypes.ROOM) as {
      type: ConfigObjectTypes.ROOM;
      options: {
        width: number;
        height: number;
        length: number;
      };
    };
    const objects = spec.filter((item) => item.type !== ConfigObjectTypes.ROOM);
    const errors: string[] = [];
    objects.forEach((obj, index) => {
      if (hasWallsCollision({ object: obj, room: room.options })) {
        errors.push(
          `Object of type "${obj.type}"(index #${index}) has collision with the walls`
        );
      }
      if (isGonnaFall(obj, objects)) {
        errors.push(
          `Object of type "${obj.type}"(index #${index}) has no foundation and will fall`
        );
      }
    });
    this.setState({
      roomOptions: room.options,
      objects,
      errors,
      specification: specString
    });
    this.renderSimulation();
  }

  renderSimulation() {
    this.simulation.render({
      roomOptions: this.state.roomOptions,
      objects: this.state.objects,
    });
  }

  getObjectVolume(obj: ConfigLineObject) {
    switch (obj.type) {
      case ConfigObjectTypes.CUBOID:
        return obj.options.width * obj.options.height * obj.options.length;
      case ConfigObjectTypes.PYRAMID:
        return (1 / 3) * obj.options.length ** 2 * obj.options.height;
      default:
        return 0;
    }
  }

  getObjectsVolume() {
    return this.state.objects
      .reduce((result, obj) => result + this.getObjectVolume(obj), 0)
      .toFixed(0);
  }

  attachEventListeners() {
    Object.entries(SELECTORS).forEach(([name, selector]) => {
      // @ts-ignore
      this.elements[name] = enhanceDom(selector);
    });

    this.elements.specInput.on('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (evt) => {
          if (!evt.target) {
            return;
          }
          this.setSpec(evt.target.result as string);
          // eslint-disable-next-line no-param-reassign
          event.target.value = '';
      };
      reader.onerror = () => {
        alert('Error of a file reading');
      };
    });

    this.elements.specification.on('keyup', (event) => {
      this.setSpec(event.target.value)
    })
  }

  render() {
    this.effect(() => {
      this.elements.totalVolume.element.innerText = String(
        this.state.roomOptions.width *
          this.state.roomOptions.height *
          this.state.roomOptions.height
      );
    }, ['roomOptions']);

    this.effect(() => {
      this.elements.objectsVolume.element.innerText = String(
        this.getObjectsVolume()
      );
    }, ['objects']);

    this.effect(() => {
      this.elements.errors.element.innerHTML = String(
        this.state.errors.map((error) => `<p>${error}</p>`).join('')
      );
    }, ['errors']);

    this.effect(() => {
      (this.elements.specification
        .element as HTMLTextAreaElement).value = this.state.specification;
    }, ['specification']);
  }
}
