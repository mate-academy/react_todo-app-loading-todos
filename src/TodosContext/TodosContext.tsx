import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { USER_ID } from '../utils/USER_ID';
import { TodosContextType } from '../types/TodosContextType';
import { SortType } from '../types/SortType';

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => { },
  errorMessage: '',
  setErrorMessage: () => { },
  preparedTodos: [],
  sortQuery: '',
  setSortQuery: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortQuery, setSortQuery] = useState(SortType.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(() => {
          if (todosFromServer.length) {
            return todosFromServer;
          }

          return null;
        });
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const preparedTodos = todos?.filter(todo => {
    switch (sortQuery as SortType) {
      case SortType.Active:
        return todo.completed === false;

      case SortType.Completed:
        return todo.completed === true;

      default:
        return true;
    }
  }) || todos;

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        errorMessage,
        setErrorMessage,
        preparedTodos,
        sortQuery,
        setSortQuery,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
