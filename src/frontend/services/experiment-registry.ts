import { Injectable, OpaqueToken, Inject } from '@angular/core';
import { Experiment, ExperimentCase } from '../models/experiment';


export const EXPERIMENTS = new OpaqueToken('Experiments');

export type IdMap<T extends { id: string }> = { [id: string]: T }


@Injectable()
export class ExperimentRegistryService {
  experiments: IdMap<Experiment> = {};
  experimentCases: IdMap<ExperimentCase> = {};

  constructor(@Inject(EXPERIMENTS) experiments: Experiment[]) {
    this.experiments = experiments.reduce<IdMap<Experiment>>(byId, {});
    this.experimentCases = experiments.reduce<IdMap<ExperimentCase>>((all, next) => {
      return Object.assign(all, next.cases.reduce<IdMap<ExperimentCase>>(byId, {}));
    }, {});
  }

  getExperiment(id: string): Experiment {
    return this.experiments[id];
  }

  getExperimentCase(id: string): ExperimentCase {
    return this.experimentCases[id];
  }

  getAllExperiments() {
    return Object.keys(this.experiments)
      .map(key => this.experiments[key]);
  }
}

function byId<T extends { id: string }>(entities: IdMap<T> = {}, next: T): IdMap<T> {
  return Object.assign(entities, {
    [next.id]: next
  });
}


export function provideExperiments(experiments: Experiment[]) {
  return { provide: EXPERIMENTS, useValue: experiments };
}