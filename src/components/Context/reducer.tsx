import { Filter } from '../../types/Filter';
import { Notification } from '../../types/Notification';
import { State } from '../../types/State';
import { Todo } from '../../types/Todo';

export type Action = { type: 'getTodos', todos: Todo[] }
| { type: 'showNotification', notification: Notification }
| { type: 'filter', filterType: Filter }
| { type: 'markCompleted', iD: number }
| { type: 'toggleCompleted', payload: boolean };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'getTodos':
      return {
        ...state,
        todos: action.todos,
      };

    case 'showNotification':
      return {
        ...state,
        notification: action.notification,
      };

    case 'filter':
      return {
        ...state,
        filterType: action.filterType,
      };

    case 'markCompleted':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.iD) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'toggleCompleted':
      return {
        ...state,
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: action.payload,
          }
        )),
      };

    default:
      return state;
  }
}
