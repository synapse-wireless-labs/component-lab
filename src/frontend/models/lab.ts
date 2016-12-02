import { Type, ModuleWithProviders } from '@angular/core';
import { Experiment } from './experiment';

export interface Lab {
  module?: NodeModule;
  ngModule: Type<any> | ModuleWithProviders;
  loadExperiments(): Experiment[];
};

export interface ResolvedLab {
  ngModule: Type<any>;
  components: { [id: string]: Type<any> };
}