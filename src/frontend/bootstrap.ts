import { NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideExperiments } from './services/experiment-registry';
import { provideResolvedLab } from './services/experiment-factory';
import { Lab } from './models/lab';
import { getModuleForExperiments } from './module-builder';
import { ComponentLabModule } from './component-lab.module';


export function bootstrap(lab: Lab): Promise<NgModuleRef<ComponentLabModule>> {
  const experiments = lab.loadExperiments();
  const resolved = getModuleForExperiments(lab.ngModule, experiments);

  const platform = platformBrowserDynamic([
    provideExperiments(experiments),
    provideResolvedLab(resolved)
  ]);

  return platform.bootstrapModule(ComponentLabModule);
}
