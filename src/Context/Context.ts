import { createContext } from 'react';

import { Todo } from '../types/Todo';
import { ErrorMessage } from '../types/ErrorMessage';

interface ContextProps {
  todos: Todo[];
  errorMessage: ErrorMessage;
  handleErrorChange: (value: ErrorMessage) => void;
  handleStatusEdit: () => void;
}

export const Context = createContext<ContextProps>({
  todos: [],
  errorMessage: ErrorMessage.NULL,
  handleErrorChange: () => {},
  handleStatusEdit: () => {},
});
