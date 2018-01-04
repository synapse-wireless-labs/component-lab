# Component Lab 
A component development and testing tool built for Angular, inspired
by [Storybook](https://storybook.js.org/)

![](http://i.imgur.com/Lcv41dc.png)


### Getting Started

#### Installation 

```bash
npm install component-lab --save-dev
```

OR

```bash
yarn add component-lab --dev
```

#### Experiments

Experiments are used to run your components, directives and pipes in many different isolated scenarios. Create an experiment in the directory where your component is located.

`button.component.exp.ts`

```ts
import { experimentOn } from 'component-lab';

export default experimentOn('Component Experiment Name')
  .case('Experiment 1 Name', {
    template: `
      <app-button>
        Foo
      </app-button>
    `
  })
  .case('Experiment 2 Name', {
    template: `
      <app-button>
        Bar
      </app-button>
    `
  });
```

Experiments can also provide both a template context object and an array of styles.
Some cases can be ignored by using `xcase` instead of `case`


```ts
import { experimentOn } from 'component-lab';


export default experimentOn('My Button')
  .case('Normal Button', {
    template: `
      <app-button></app-button>
    `
  })
  .case('Warning Button', {
    context: {
      buttonLabel: 'Warning!',
      onClick() {
        console.log('Clicked!');
      }
    },
    styles: [`
      :host {
        text-align: center;
      }
    `],
    template: `
      <app-button (click)="onClick()">
        {{ buttonLabel }}
      </app-button>
    `
  })
  .xcase('Not Yet Implemented', {
    template: `
      <app-button raised>Raised Button</app-button>
    `
  });
```

#### Usage

[Angular CLI](#angular-cli)  
[Custom Webpack Config](#custom-webpack-config)

##### Angular CLI

1. Create some [experiments](#experiments) for your component, directive or pipe.

2. Create a `lab.ts` file in your `src` folder for your lab.

```ts
import { NgModule } from '@angular/core';
import { createLab } from 'component-lab';

import { ButtonComponent } from './app/button/button.component';

declare var require: any;

@NgModule({
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ],
  imports: [
  ],
  providers: [],
})
export class LabModule { }

createLab({
  /**
  * NgModule to import. All components and pipes must be exported
  * by this module to be useable in your experiments. Use an existing
  * NgModule from your application or create a custom one.
  */  
  ngModule: LabModule,

  loadExperiments() {
    /**
     * Function that returns an array of experiments.
     *
     * Here is an example using webpack's `require.context` to
     * load all modules ending in `.exp.ts` and returning thier
     * default exports as an array:
     */
    const context = require.context('./', true, /\.exp\.ts/);
    return context.keys().map(context).map(mod => mod.default);
  }
});
```

3. Create a `lab.html` in your `src` folder to use for the component-lab app.

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Component Lab</title>
  <base href="/">
</head>
<body>
  <component-lab>Loading...</component-lab>
</body>
</html>
```

4. Create a `tsconfig.lab.json` in your src folder. This file should be a copy of your `tsconfig.app.json` with the `angularCompilerOptions` added to specify an `entryModule` with the path to the `lab`.

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    "module": "es2015",
    "types": []
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ],
  "angularCompilerOptions": {
    "entryModule": "lab#LabModule"
  }
}
```

5. Create another app in your `.angular-cli.json` file in the `apps` array to point it to the lab files.

```json
    {
      "name": "component-lab",
      "root": "src",
      "outDir": "dist-lab",
      "assets": [
        "assets",
        "favicon.ico"
      ],
      "index": "lab.html",
      "main": "lab.ts",
      "polyfills": "polyfills.ts",
      "test": "test.ts",
      "tsconfig": "tsconfig.lab.json",
      "testTsconfig": "tsconfig.spec.json",
      "prefix": "app",
      "styles": [
        "styles.css"
      ],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
    }
```

6. Update your `tsconfig.app.json` to exclude your lab files.

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    "module": "es2015",
    "types": []
  },
  "exclude": [
    "lab.ts",
    "test.ts",
    "**/*.spec.ts"
  ]
}
```

7. Run the CLI with your lab app.

```bash
npm start -- --app component-lab --port 8080
```

OR

```bash
yarn start -- --app component-lab --port 8080
```


##### Custom Webpack Config

1. Create some [experiments](#experiments) for your component, directive or pipe.

2. Create a `lab.ts` file for your configuration.

```ts
import { NgModule } from '@angular/core';
import { createLab } from 'component-lab';

import { ButtonComponent } from './src/app/button/button.component';

declare var require: any;

@NgModule({
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ],
  imports: [
  ],
  providers: [],
})
export class LabModule { }

createLab({
  /**
  * NgModule to import. All components and pipes must be exported
  * by this module to be useable in your experiments
  */  
  ngModule: LabModule,

  loadExperiments() {
    /**
     * Function that returns an array of experiments.
     *
     * Here is an example using webpack's `require.context` to
     * load all modules ending in `.exp.ts` and returning thier
     * default exports as an array:
     */
    const context = require.context('./', true, /\.exp\.ts/);
    return context.keys().map(context).map(mod => mod.default);
  }
});
```

3. Create a `component-lab.config.js` file in the root of your project

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
      * module (see "Experiments") 
      */
    suites: {
      feature: './src/lab.ts'
    }
  };
```

4. In the `scripts` section of your package.json add a script to start Component Lab.

```json
{
  "scripts": {
    "component-lab": "component-lab"
  }
}
```

5. Start the Component Lab with the suite name.

```bash
npm run component-lab -- feature
```

OR

```bash
yarn run component-lab -- feature
```
