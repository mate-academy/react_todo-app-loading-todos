import {
  PropsWithChildren, createContext, useEffect, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID } from '../../utils/UserId';
import { client } from '../../utils/fetchClient';

enum Status{
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const TodoContext = createContext({
  todos: [] as Todo[],
  setFilter: (() => {}) as React.Dispatch<React.SetStateAction<Status>>,
  filter: Status.all,
  error: '',
  setError: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
});

export const Context: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [filter, setFilter] = useState<Status>(Status.all);
  const [error, setError] = useState('');

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(setTodos)
      .catch(() => {
        setError('Enable to download todo');
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, []);

  const prepareTodos = () => {
    switch (filter) {
      case Status.all:
      default:
        return [...todos];
      case Status.active:
        return [...todos].filter((todo) => !todo.completed);
      case Status.completed:
        return [...todos].filter((todo) => todo.completed);
    }
  };

  const preparedTodos = prepareTodos();

  const value = {
    todos: preparedTodos,
    setFilter,
    filter,
    error,
    setError,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
