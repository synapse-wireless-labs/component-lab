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

