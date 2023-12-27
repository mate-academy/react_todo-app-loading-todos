import { ErrorMessages } from '../enums';
import { State } from '../types';

export const initialState: State = {
  todos: [],
  errorMessage: ErrorMessages.NoError,
};
