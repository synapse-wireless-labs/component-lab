import { ComponentLabConfig } from './config';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

export interface DevServerConfig {
  port?: number;
  proxy?: any;
  host?: string;
  quiet?: boolean;
  noInfo?: boolean;
  watchOptions?: any;
  https?: boolean | {key: any; cert: any; };
}


export function startServer(config: ComponentLabConfig, suite: string) {
  const webpackConfig: any = config.webpackConfig;
  const devServerConfig: DevServerConfig = webpackConfig.devServer;
  let https = false,
    host = config.host || "localhost",
    port = config.port || 8080;
  if (devServerConfig) {
    https = !!devServerConfig.https;
    host = devServerConfig.host || host;
    port = devServerConfig.port || port;
  }
  const includes = config.include || [];

  webpackConfig.entry = {
    main: [
      `webpack-dev-server/client?http${https?'s':''}://${host}:${port}/`,
      ...includes,
      config.suites[suite]
    ]
  };

  webpackConfig.plugins = webpackConfig.plugins.filter(p => ! (p instanceof HtmlWebpackPlugin));

  const compiler = webpack(webpackConfig);
  
  compiler.apply(new ProgressPlugin({
    profile: true,
    colors: true
  }));

  compiler.apply(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../index.html')
  }));

  const serverConfig = Object.assign({}, {
    historyApiFallback: true,
    stats: {
      assets: true,
      colors: true,
      version: true,
      hash: true,
      timings: true,
      chunks: false,
      chunkModules: false  
    },
    inline: true
  }, devServerConfig);

  const server = new WebpackDevServer(compiler, serverConfig);

  return new Promise((resolve, reject) => {
    server.listen(port, `${host}`, function(err, stats) {
      if (err) {
        console.error(err.stack || err);
        if (err.details) { console.error(err.details); }
        reject(err.details);
      }
    });
  });
}
