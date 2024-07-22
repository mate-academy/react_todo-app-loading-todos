import { Actions } from '../types/Actions';
import { Todo } from '../types/Todo';

export const filteredTodos = (arr: Todo[], action: Actions): Todo[] => {
  switch (action) {
    case Actions.ALL:
      return arr;

    case Actions.ACTIVE:
      return arr.filter(todo => todo.completed === false);

    case Actions.COMPLETED:
      return arr.filter(todo => todo.completed === true);

    default:
      return arr;
  }
};
