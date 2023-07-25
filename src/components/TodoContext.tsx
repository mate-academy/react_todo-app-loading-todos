import React, { useEffect, useState } from 'react';
import { TodosContextType } from '../types/TodoContext';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { ErrorType } from '../types/Error';
import { client } from '../utils/fetchClient';

const USER_ID = 11121;

export const TodosContext = React.createContext<TodosContextType | null>(null);

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setError(ErrorType.fetchError);
      });
  }, []);

  const resetError = () => {
    setError('');
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +Date.now(),
      userId: USER_ID,
      title,
      completed: false,
    };

    return client
      .post<Todo>('/todos', newTodo)
      .then((createdTodo) => {
        setTodos(prevTodos => [createdTodo, ...prevTodos]);
        setError('');
      })
      .catch(() => {
        setError(ErrorType.addTodo);
      });
  };

  return (
    <TodosContext.Provider value={{
      todos,
      error,
      resetError,
      addTodo,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
