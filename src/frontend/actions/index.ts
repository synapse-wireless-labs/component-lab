export const ActionTypes = {
  CHOOSE_PREVIEW_BACKGROUND: '[Component Lab] Choose Preview Background',
  SELECT_EXPERIMENT_CASE: '[Component Lab] Select Experiment Case',
};







function type<T>(label: T | ''): T {
  return <T>label;
}