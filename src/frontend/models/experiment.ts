export interface ExperimentCase {
  id: string;
  description: string;
  context?: any;
  template: string;
  styles?: string[];
  showSource?: boolean;
}


export interface Experiment {
  id: string;
  name: string;
  module?: NodeModule;
  cases: ExperimentCase[];
}
