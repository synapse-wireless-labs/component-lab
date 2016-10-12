import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    Routing,
  ],
  providers: [
    ExperimentFactoryService,
    ExperimentRegistryService,
  ],
  declarations: [
    ComponentLabComponent,
    RendererComponent,
    RootContainerComponent,
    NavComponent,
    PreviewContainerComponent,
    LayoutComponent,
    StageComponent,
    ToolbarComponent,
  ],
  entryComponents: [
    RootContainerComponent,
    PreviewContainerComponent,
  ],
  bootstrap: [
    ComponentLabComponent,
  ]
})
export class ComponentLabModule { }