import { AppView } from './view/appView';
import { Simulation } from './simulation';

async function main() {
  const simulation = new Simulation();
  const view = new AppView(simulation);
  await view.init();
}

main().catch((error) => {
  console.error('Failed to bootstrap', error);
});
