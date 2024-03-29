import React, { useEffect, useMemo, useState } from 'react';

import * as todosServices from '../../api/todos';
import { Todo } from '../../types/Todo';
import { useError } from './ErrorContext';

export const TodosContext = React.createContext<Todo[]>([]);

export const TodosControlContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeTodo: (todoId: number) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addTodo: (todo: Todo) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleCheck: (updatedTodo: Todo) => {},
  handleClearAll: () => {},
  handleCheckAll: () => {},
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
  const { setErrorMessage } = useError();
  const [, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await todosServices.getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

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

  const allCompleted = todos.every(todo => todo.completed);

  const handleCheckAll = () => {
    const updatedTodo = todos.map(todo => {
      return { ...todo, completed: !allCompleted };
    });

    setTodos(updatedTodo);
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  const methods = useMemo(
    () => ({
      removeTodo,
      addTodo,
      handleCheck,
      handleClearAll,
      handleCheckAll,
    }),
    [],
  );

  return (
    <TodosControlContext.Provider value={methods}>
      <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
    </TodosControlContext.Provider>
  );
};
