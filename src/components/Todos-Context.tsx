import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID, getTodos } from '../api/todos';
import { UserWarning } from '../UserWarning';
import { Status, filterTodo } from '../utils/TodosFilter';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
  newTodo: Todo[];
  setFiltred: Dispatch<SetStateAction<Status>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  loading: boolean;
  handleCompleted: (id: number) => void;
  filtred: Status;
};

const initialTodosContextValue: TodosContextType = {
  todos: [],
  setTodos: () => {},
  setQuery: () => [],
  query: '',
  newTodo: [],
  setFiltred: () => {},
  errorMessage: '',
  setErrorMessage: () => '',
  loading: false,
  handleCompleted: () => {},
  filtred: Status.All,
};

export const TodosContext = React.createContext<TodosContextType>(
  initialTodosContextValue,
);

type PropsContext = {
  children: React.ReactNode;
};

export const TodoContextProvider: React.FC<PropsContext> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filtred, setFiltred] = useState<Status>(Status.All);
  const [loading, setLoading] = useState<boolean>(false);

  const newTodo: Todo[] = filterTodo(todos, filtred);

  function getAllTodos() {
    setLoading(true);
    getTodos()
      .then(receivedTodos => {
        setTodos(receivedTodos);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage(`Unable to load todos`);
        setLoading(false);
      });
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  useEffect(() => {
    if (USER_ID) {
      getAllTodos();
    }
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleCompleted = (id: number) => {
    const newStateTodos = newTodo.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(newStateTodos);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        query,
        setQuery,
        newTodo,
        setFiltred,
        errorMessage,
        setErrorMessage,
        loading,
        handleCompleted,
        filtred,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
