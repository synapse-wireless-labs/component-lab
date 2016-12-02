# Component Lab 
A component development and testing tool built for Angular, inspired
by [React Storybook](https://getstorybook.io/)

![](http://i.imgur.com/Lcv41dc.png)


### Getting Started

#### Installation and Configuration
1. Install Component Lab:
  Via npm:
  ```bash
  npm install component-lab --save-dev
  ```

  Via yarn:
  ```bash
  yarn add component-lab --dev
  ```

2. Create a `component-lab.config.js` file in the root of your project

  ```js
  /**
   * Export a single configuration object
   */
  module.exports = {
    /**
     * Webpack configuration object used to load your experiments
     */
    webpackConfig: { ... },
    /**
     *  Host and port of the Component Lab webpack development server
     */
    host: 'localhost',
    port: 8080,
    /**
     * Additional list of files to include in the bundle
     */
    include: [],
    /**
     * Dictionary of suites. Each suite should be a lab configuration 
     * module (see "Writing Experiments") 
     */
    suites: {
      ui: './src/ui/lab.ts',
      devices: './src/devices/lab.ts'
    }
  };
  ```


#### Writing Experiments

1. Create a `component-name.exp.js` file in the directory your component is located.

  ```ts
  import { experimentOn } from 'component-lab';


  export default experimentOn('Component Experiment Name')
    .case('Experiment 1 Name', {
      template: `
        <my-component>
          Foo
        </my-component>
      `
    })
    .case('Experiment 2 Name', {
      template: `
        <my-component>
          Bar
        </my-component>
      `
    });
  ```

  Experiments can also provide both a template context object and an array of styles.
  Some cases can be ignored by using `xcase` instead of `case`

  Example:

  ```ts
  import { experimentOn } from 'component-lab';
  

  export default experimentOn('My Button')
    .case('Normal Button', {
      template: `
        <my-button></my-button>
      `
    })
    .case('Warning Button', {
      context: {
        buttonLabel: 'Warning!',
      },
      styles: [`
        :host {
          text-align: center;
        }
      `],
      template: `
        <my-button [type]="warning">
          {{ buttonLabel }}
        </my-button>
      `
    })
    .xcase('Not Yet Implemented', {
      template: `
        <my-button raised>Raised Button</my-button>
      `
    })
  ```

  

#### Running Component Lab
  1. Create a lab configuration module:

  ```ts
  import { createLab } from 'component-lab';
  import { FeatureModule } from './feature.module';


  createLab({
    /**
     * NgModule to import. All components and pipes must be exported
     * by this module to be useable in your experiments
     */
    ngModule: FeatureModule,
    /**
     * Function that returns an array of experiments.
     *
     * Here is an example using webpack's `require.context` to
     * load all modules ending in `.exp.ts` and returning thier
     * default exports as an array:
     */
    loadExperiments() {
      const context = (require as any).context('./', true, /\.exp\.ts/);

      return context.keys().map(context).map(mod => mod.default);
    }
  });
  ```

  2. List the lab as a suite in your `component-lab.config.js` file:

  ```js
  module.exports = {
    webpackConfig: { ... },
    host: 'localhost',
    port: 8080,
    include: [],
    suites: {
      feature: './src/feature/feature.module.ts'
    }
  };
  ```

  3. In the `scripts` section of your package.json add a script to start Component Lab:
  ```json
  {
    "scripts": {
      "component-lab": "component-lab"
    }
  }
  ```

  4. Start the Component Lab server using npm or yarn providing the suite name:

  Via npm:
  ```bash
  npm run component-lab -- feature
  ```

  Via yarn:
  ```bash
  yarn run component-lab -- feature
  ```
