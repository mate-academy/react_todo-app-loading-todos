import { State } from '../types/State';
import { Action } from '../types/Action';

export const stateReducer = (state: State, action: Action): State => {
  let todos = [...state.todos];
  let filteredTodos = [...state.filteredTodos];

  switch (action.type) {
    case 'setTodos':
      todos = [...action.payload];

      return {
        ...state,
        todos,
      };

    case 'setFilteredTodos':
      filteredTodos = [...action.payload];

      return {
        ...state,
        filteredTodos,
      };

    case 'addTodo':
      todos.push(action.payload);

      return {
        ...state,
        todos,
      };

    case 'editTodo':
      todos = state.todos.map(todo => (
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      ));

      return {
        ...state,
        todos,
      };

    case 'deleteTodo':
      todos = state.todos.filter(todo => todo.id !== action.payload.id);

      return {
        ...state,
        todos,
      };

    case 'clearCompleted':
      todos = state.todos.filter(todo => !todo.completed);

      return {
        ...state,
        todos,
      };

    case 'toggleCompletion':
      todos = state.todos.map(todo => (
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      ));

      return {
        ...state,
        todos,
      };

    case 'toggleAllCompletions':
      todos = state.todos.every(todo => todo.completed)
        ? state.todos.map(todo => ({ ...todo, completed: false }))
        : state.todos.map(todo => ({ ...todo, completed: true }));

      return {
        ...state,
        todos,
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'setError':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
