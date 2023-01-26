import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

const { active, completed } = Filter;

export function filterTotos(todosArr: Todo[], type: string) {
  switch (type) {
    case completed:
      return todosArr.filter((todo) => todo.completed);
    case active:
      return todosArr.filter((todo) => !todo.completed);
    default:
      return todosArr;
  }
}
