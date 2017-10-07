import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { Routing } from './routing';

import { ComponentLabComponent } from './containers/app';
import { RootContainerComponent } from './containers/root';
import { PreviewContainerComponent } from './containers/preview';

import { RendererComponent } from './components/renderer';
import { NavComponent } from './components/nav';
import { LayoutComponent } from './components/layout';
import { StageComponent } from './components/stage';
import { ToolbarComponent } from './components/toolbar';

import { ExperimentFactoryService } from './services/experiment-factory';
import { ExperimentRegistryService } from './services/experiment-registry';

export const LAB_IMPORTS = [
  CommonModule,
  Routing,
];

export const LAB_PROVIDERS = [
  ExperimentFactoryService,
  ExperimentRegistryService,
];

export const LAB_DECLARATIONS = [
  ComponentLabComponent,
  RendererComponent,
  RootContainerComponent,
  NavComponent,
  PreviewContainerComponent,
  LayoutComponent,
  StageComponent,
  ToolbarComponent,
];

export const LAB_ENTRY_COMPONENTS = [
  RootContainerComponent,
  PreviewContainerComponent,
];

@NgModule({
  imports: LAB_IMPORTS,
  providers: LAB_PROVIDERS,
  declarations: LAB_DECLARATIONS,
  entryComponents: LAB_ENTRY_COMPONENTS,
  exports: [CommonModule, LAB_DECLARATIONS]
})
export class ComponentLabCommonModule { }

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentLabCommonModule    
  ],
  bootstrap: [
    ComponentLabComponent,
  ]
})
export class ComponentLabModule { }

