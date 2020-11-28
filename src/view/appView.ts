import { Component } from './component';
import { Simulation } from '../simulation';
import { EnhancedDomElement, enhanceDom } from './utils/dom';
import './index.scss';
import {ConfigLineObject, ConfigObjectTypes, parseSpecification} from "./utils/specification";

type State = {
  roomOptions: {
    width: number,
    height: number,
    length: number
  },
  objects: ConfigLineObject[]
};

const SELECTORS = {
  specInput: '.js-spec-input'
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
        length: 20
      },
      objects: []
    });
    this.simulation = simulation;
  }

  async init() {
    this.attachEventListeners();
    await this.simulation.init();
    this.renderSimulation()
    this.render();
  }

  setSpec(spec:ConfigLineObject[]) {
    const room = spec.find(item => item.type === ConfigObjectTypes.ROOM) as {type: ConfigObjectTypes.ROOM, options: {
        width: number,
        height: number,
        length: number
      }}
    const objects = spec.filter(item => item.type !== ConfigObjectTypes.ROOM);
    this.setState({
      roomOptions: room.options,
      objects
    })
    this.renderSimulation()
  }

  renderSimulation() {
    this.simulation.render({roomOptions: this.state.roomOptions, objects: this.state.objects});
  }

  attachEventListeners() {
    Object.entries(SELECTORS).forEach(([name, selector]) => {
      // @ts-ignore
      this.elements[name] = enhanceDom(selector);
    });

    this.elements.specInput.on('change', (event) => {
      const file = event.target.files[0]
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        try {
          this.setSpec(parseSpecification(evt.target.result as string))
        } catch(error) {
          alert(`Failed to parse file. Error: ${  JSON.stringify(error)}`)
        }
      }
      reader.onerror =  () => {
        alert("Error reading file")
      }
    } )
  }

  render() {

  }
}
