import {
  FC,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { getTodos } from '../../api/todos';
import { Context } from '../../Context';

import { Todo } from '../../types/Todo';
import { ErrorMessage } from '../../types/ErrorMessage';
import { Filter } from '../../types/Filter';

interface Props {
  children: ReactNode;
}

export const USER_ID = 12176;

export const ContextProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.UNABLE_TO_LOAD));
  }, [todos]);

  const handleErrorChange = (value: string) => {
    setErrorMessage(value);
  };

  const handleStatusEdit = () => {
    handleErrorChange(ErrorMessage.UNABLE_TO_UPDATE);
  };

  const filteredTodos = useMemo(() => {
    if (filter === Filter.ACTIVE) {
      return todos.filter((item) => !item.completed);
    }

    if (filter === Filter.COMPLETED) {
      return todos.filter((item) => item.completed);
    }

    return todos;
  }, [filter, todos]);

  const handleActiveTodos = useMemo(() => {
    return todos.reduce((sum, item) => {
      if (!item.completed) {
        return sum + 1;
      }

      return sum;
    }, 0);
  }, [todos]);

  return (
    <Context.Provider value={{
      todos,
      filteredTodos,
      errorMessage,
      handleErrorChange,
      handleStatusEdit,
      handleActiveTodos,
      filter,
      setFilter,
    }}
    >
      {children}
    </Context.Provider>
  );
};
