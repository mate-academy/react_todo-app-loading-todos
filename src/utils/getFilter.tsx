import { SelectedType } from '../types/SelectedType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  selectedOption: SelectedType,
) => {
  let filteredTodos = [...todos];

  if (selectedOption !== SelectedType.ALL) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (selectedOption) {
        case SelectedType.ACTIVE:
          return todo.completed === false;

        case SelectedType.COMPLETED:
          return todo.completed === true;

        default:
          return;
      }
    });
  }

  return filteredTodos;
};
