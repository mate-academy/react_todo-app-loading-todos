/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';

import * as todosServices from '../../api/todos';
import { Todo } from '../../types/Todo';
import { useError } from './ErrorContext';
import { Status, TodoError } from '../../types/enums';

interface TodosContextType {
  todos: Todo[];
  statusTodo: Status;
  inputTodo: string;
}

const contextValue = {
  todos: [],
  statusTodo: Status.All,
  inputTodo: '',
};

export const TodosContext = React.createContext<TodosContextType>(contextValue);

export const TodosControlContext = React.createContext({
  removeTodo: (_todoId: number) => {},
  addTodo: (_todo: Todo) => {},
  handleCheck: (_updatedTodo: Todo) => {},
  handleClearAll: () => {},
  toggleAll: () => {},
  setStatusTodo: (_statusTodo: Status) => {},
  setInputTodo: (_inputTodo: string) => {},
});

export function getMaxTodoId(todos: Todo[]) {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids, 0);
}

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTodo, setInputTodo] = useState('');
  const [statusTodo, setStatusTodo] = useState(Status.All);

  const { setErrorMessage } = useError();
  const [, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await todosServices.getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage(TodoError.UnableToLoad);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [setErrorMessage]);

  const removeTodo = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  const addTodo = (todo: Todo) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { ...todo, id: getMaxTodoId(prevTodos) + 1 },
    ]);
  };

  const handleCheck = (updatedTodo: Todo) => {
    setIsLoading(true);
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === updatedTodo.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
    setIsLoading(false);
  };

  const toggleAll = () => {
    setTodos(prevTodos => {
      const allCompleted = prevTodos.every(todo => todo.completed);

      return prevTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));
    });
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  const contextValueMemo = useMemo(
    () => ({
      todos,
      statusTodo,
      inputTodo,
    }),
    [todos, statusTodo, inputTodo],
  );

  const methods = useMemo(
    () => ({
      removeTodo,
      addTodo,
      handleCheck,
      handleClearAll,
      toggleAll,
      setStatusTodo,
      setInputTodo,
    }),
    [],
  );

  return (
    <TodosControlContext.Provider value={methods}>
      <TodosContext.Provider value={contextValueMemo}>
        {children}
      </TodosContext.Provider>
    </TodosControlContext.Provider>
  );
};
