import { ErrorMessages } from '../enums';
import { Todo } from './Todo';

export type State = {
  todos: Todo[],
  errorMessage: ErrorMessages;
};
