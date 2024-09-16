import { State, Filter, Todo } from '../types/Types';

export type Action =
  | { type: 'getTodos'; payload: Todo[] }
  | { type: 'editTitle'; id: number; newTitle: string }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'deleteCompletedTodo' }
  | { type: 'markStatus'; payload: number }
  | { type: 'changeStatusAll'; payload: boolean }
  | { type: 'addTodo'; title: string; userId: number }
  | { type: 'errorMessage'; payload: string }
  | { type: 'filter'; payload: Filter };

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'getTodos':
      return {
        ...state,
        todos: action.payload,
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'deleteCompletedTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'addTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: action.title,
            completed: false,
            userId: action.userId,
          },
        ],
      };

    case 'editTitle':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id && todo.title !== action.newTitle) {
            return {
              ...todo,
              title: action.newTitle,
              completed: false,
            };
          }

          return todo;
        }),
      };

    case 'markStatus':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'changeStatusAll':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };

    case 'errorMessage':
      return {
        ...state,
        errorMessage: action.payload,
      };

    case 'filter':
      return {
        ...state,
        filterBy: action.payload,
      };

    default:
      return state;
  }
}
