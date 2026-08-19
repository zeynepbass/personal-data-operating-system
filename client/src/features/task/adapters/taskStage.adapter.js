export function taskStageAdapter(stage) {
  return {
    id: stage._id,
    name: stage.name,
    title: stage.title,
    color: stage.color,
    order: stage.order ?? 0,
  };
};
