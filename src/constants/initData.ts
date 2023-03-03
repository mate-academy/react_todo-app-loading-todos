import { Filter } from '../types/Filter';

export const initData = {
  todos: [],
  filter: Filter.All,
  customError: { active: false, text: '' },
  activeTodoData: { hasActiveTodo: false, activeLeft: 0 },
};
