import { Todo } from '../types/Todo';
import { ErrorTypes, FilterTypes } from '../types/enums';

export function prepareVisibleTodos(todos: Todo[], filterBy: FilterTypes) {
  let visibleTodos: Todo[] = [...todos];

  if (filterBy !== 'All') {
    visibleTodos = visibleTodos.filter(item => {
      switch (filterBy) {
        case 'Active':
          return !item.completed;
        case 'Completed':
          return item.completed;
        default:
          return item;
      }
    });
  }

  return visibleTodos;
}

export const handleError = (
  message: ErrorTypes,
  setErrorMessage: (message: ErrorTypes) => void,
) => {
  setErrorMessage(message);
  setTimeout(() => setErrorMessage(ErrorTypes.def), 3000);
};
