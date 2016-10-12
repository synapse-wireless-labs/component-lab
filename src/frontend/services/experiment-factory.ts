import { Injectable, NgModule, Type, Compiler, NgModuleFactory, OpaqueToken, Inject, Injector, ComponentFactory } from '@angular/core';
import { ResolvedLab } from '../models/lab';

export const RESOLVED_LAB = new OpaqueToken('Resolved Lab');

export interface CompiledExperiment {
  injector: Injector;
  factory: ComponentFactory<any>;
}

@Injectable()
export class ExperimentFactoryService {
  private _lab: ResolvedLab;
  private _factory: NgModuleFactory<any>;

  constructor(@Inject(RESOLVED_LAB) lab: ResolvedLab, compiler: Compiler) {
    this._lab = lab;
    this._factory = compiler.compileModuleSync(lab.ngModule);
  }

  compileComponent(id: string, injector: Injector): CompiledExperiment {
    const component = this._lab.components[id];
    const ref = this._factory.create(injector);
    const factory = ref.componentFactoryResolver.resolveComponentFactory(component);

    return { factory, injector: ref.injector };
  }
}

export function provideResolvedLab(lab: ResolvedLab) {
  return { provide: RESOLVED_LAB, useValue: lab };
}