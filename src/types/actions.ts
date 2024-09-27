import { Filter, TodoFromServer } from './state';

export enum Action {
  initialTodo = 'initialTodo',
  addTodo = 'addTodo',
  updateTodo = 'updateTodo',
  deleteTodo = 'deleteTodo',
  changeFiilter = 'changeFiilter',
  cleareCompleted = 'cleareCompleted',
}

export type Actions =
  | { type: Action.initialTodo; payload: TodoFromServer[] }
  | { type: Action.addTodo; payload: TodoFromServer }
  | { type: Action.updateTodo; payload: TodoFromServer }
  | { type: Action.deleteTodo; payload: number }
  | { type: Action.changeFiilter; payload: Filter }
  | { type: Action.cleareCompleted };
