import { createContext } from 'react';

import { Todo } from '../types/Todo';

interface ContextProps {
  todos: Todo[];
}

export const Context = createContext<ContextProps>({
  todos: [],
});
