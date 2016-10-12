import { Component } from '@angular/core';


@Component({
  selector: 'cl-toolbar',
  template: `
    <div class="button-group">
      <button>
        <i class="material-icons md-18">desktop_windows</i>
      </button>
      <button>
        <i class="material-icons md-18">tablet_android</i>
      </button>
      <button>
        <i class="material-icons md-18">phone_iphone</i>
      </button>
    </div>

    <!--
    <i class="material-icons">brightness_1</i>
    <i class="material-icons">brightness_5</i>
    -->
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 40px;
      padding: 4px;
      background-color: #F4F7FA;
    }

    .button-group {
      width: 100%;
      display: flex;
      flex-direction: row;

    }

    button {
      display: block;
      width: 32px;
      height: 32px;
      margin: 0 4px;
      background-color: transparent;
      outline: none !important;
      box-shadow: none !important;
      border: none !important;
      opacity: 0.1;
      transition: opacity 250ms;
      cursor: pointer;
    }

    button.selected, button:hover {
      opacity: 0.5;
    }
  `]
})
export class ToolbarComponent {

}