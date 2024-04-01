import React, { useContext, useEffect, useMemo, useState } from 'react';

import * as todosServices from '../../api/api';
import { Todo } from '../../types/Todo';
import { useError } from './ErrorContext';
import { Status, TodoError } from '../../types/enums';

interface TodosContextType {
  todos: Todo[];
  statusTodo: Status;
  removeTodo: (_todoId: number) => void;
  addTodo: (_todo: Todo) => void;
  handleCheck: (_updatedTodo: Todo) => void;
  handleClearAll: () => void;
  toggleAll: () => void;
  setStatusTodo: (_statusTodo: Status) => void;
}

const contextValue = {
  todos: [],
  statusTodo: Status.All,
  removeTodo: () => {},
  addTodo: () => {},
  handleCheck: () => {},
  handleClearAll: () => {},
  toggleAll: () => {},
  setStatusTodo: () => {},
};

export const TodosContext = React.createContext<TodosContextType>(contextValue);

export function getMaxTodoId(todos: Todo[]) {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids, 0);
}

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusTodo, setStatusTodo] = useState(Status.All);

  const { setErrorMessage } = useError();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await todosServices.getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage(TodoError.UnableToLoad);
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
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === updatedTodo.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
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
      removeTodo,
      addTodo,
      handleCheck,
      handleClearAll,
      toggleAll,
      setStatusTodo,
    }),
    [todos, statusTodo],
  );

  return (
    <TodosContext.Provider value={contextValueMemo}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }

  return context;
};
