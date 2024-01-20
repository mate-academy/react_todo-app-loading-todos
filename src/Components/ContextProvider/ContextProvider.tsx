import {
  FC,
  ReactNode,
  useState,
  useEffect,
} from 'react';

import { getTodos } from '../../api/todos';
import { Context } from '../../Context';

import { Todo } from '../../types/Todo';

interface Props {
  children: ReactNode;
}

export const USER_ID = 12176;

export const ContextProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos(USER_ID).then(setTodos);
  }, []);

  return (
    <Context.Provider value={{
      todos,
    }}
    >
      {children}
    </Context.Provider>
  );
};
