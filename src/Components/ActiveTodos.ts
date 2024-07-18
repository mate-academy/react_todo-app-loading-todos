import { Todo } from '../types/Todo';

export const fetchActiveTodos = (tasks: Todo[]) => {
  return tasks.filter(task => !task.completed);
};
