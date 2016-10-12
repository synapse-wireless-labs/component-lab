import { Component, Input, OnDestroy, Injector, ViewContainerRef, ComponentRef } from '@angular/core';
import { ExperimentFactoryService } from '../services/experiment-factory';

@Component({
  selector: 'cl-renderer',
  template: ''
})
export class RendererComponent implements OnDestroy {
  private _ref: ComponentRef<any>;

  constructor(
    private experimentFactory: ExperimentFactoryService,
    private injector: Injector,
    private view: ViewContainerRef
  ) { }

  private _cleanup() {
    if (this._ref) {
      this._ref.destroy();
      this._ref = null;
    }
  }

  @Input() set id(id: string) {
    this._cleanup();

    const { factory, injector } = this.experimentFactory.compileComponent(id, this.injector);
    const position = this.view.length;

    this._ref = this.view.createComponent(factory, position, injector, []);
  }


  ngOnDestroy() {
    this._cleanup();
  }
}