import { Component } from './component';
import { Simulation } from '../simulation';
import { CONFIG } from '../config';
import { EnhancedDomElement, enhanceDom } from '../utils/dom';

type State = {};

const SELECTORS = {
} as const;

export class AppView extends Component<State> {
  private elements: Record<
    keyof typeof SELECTORS | string,
    EnhancedDomElement
  > = {};

  private simulation: Simulation;

  private updateIntervalId: number | undefined;

  constructor(simulation: Simulation) {
    super({
    });
    this.simulation = simulation;
  }

  refreshData() {
    this.setState({});
  }

  async init() {
    this.attachEventListeners();
    await this.simulation.init();
    this.simulation.render();
    this.render();
  }

  attachEventListeners() {
    Object.entries(SELECTORS).forEach(([name, selector]) => {
      this.elements[name] = enhanceDom(selector);
    });

    window.addEventListener('resize', () => {
      this.simulation.render();
      this.refreshData();
    });
  }
  render() {

  }
}
