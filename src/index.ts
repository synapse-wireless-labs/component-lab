import { Experiment, ExperimentCase } from './frontend/models/experiment';
import { Lab } from './frontend/models/lab';
import { bootstrap } from './frontend/bootstrap';

export interface CaseConfig {
  context?: any;
  template: string;
  showSource?: boolean;
  styles?: string[];
}

export { getModuleForExperiments } from './frontend/module-builder';
export { provideExperiments } from './frontend/services/experiment-registry';
export { provideResolvedLab } from './frontend/services/experiment-factory';
export { ComponentLabModule, ComponentLabCommonModule } from './frontend/component-lab.module';
export { ComponentLabComponent } from './frontend/containers/app';

export function createLab(lab: Lab) {
  bootstrap(lab);
}

let expId = 0;

export class ExperimentBuilder implements Experiment {
  id: string;
  cases: ExperimentCase[] = [];
  private _callCount = 0;

  constructor(public name: string, public module?: NodeModule) {
    this.id = `exp${module ? module.id : ++expId}`;
  }

  case(description: string, config: CaseConfig): this {
    this.cases.push({
      id: `${this.id}-${++this._callCount}`,
      description,
      template: config.template,
      context: config.context,
      showSource: config.showSource,
      styles: config.styles
    });

    return this;
  }

  xcase(description: string, config: CaseConfig): this {
    return this;
  }
}

export function experimentOn(component: string, module?: NodeModule): ExperimentBuilder {
  return new ExperimentBuilder(component, module);
}
