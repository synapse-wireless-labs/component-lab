import { Experiment, ExperimentCase } from './frontend/models/experiment';
import { Lab } from './frontend/models/lab';
import { bootstrap } from './frontend/bootstrap';

export interface CaseConfig {
  context?: any;
  template: string;
  styles?: string[];
}

export function createLab(lab: Lab) {
  bootstrap(lab);
}

export class ExperimentBuilder implements Experiment {
  id: string;
  cases: ExperimentCase[] = [];
  private _callCount = 0;

  constructor(public name: string, public module?: NodeModule) {
    this.id = `${module.id}`;
  }

  case(description: string, config: CaseConfig): this {
    this.cases.push({
      id: `${this.id}-${++this._callCount}`,
      description,
      template: config.template,
      context: config.context,
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