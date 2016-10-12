export interface ComponentLabConfig {
  webpackConfig: any;
  host?: string;
  port?: number;
  include?: string[];
  suites: {
    [suite: string]: string
  };
}