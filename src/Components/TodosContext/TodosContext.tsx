import React, { useState, useMemo, useCallback } from 'react';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../types/todoContext';

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  setTodos: () => {},
  filter: Status.ALL,
  setFilter: () => {},
  completedTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>(Status.ALL);

  const completedTodo = useCallback((todoId: number) => {
    setTodos((prevTodos) => prevTodos.map((someTodo) => {
      if (someTodo.id === todoId) {
        return {
          ...someTodo,
          completed: !someTodo.completed,
        };
      }

      return someTodo;
    }));
  }, []);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filter,
    setFilter,
    completedTodo,
  }), [todos, filter, completedTodo]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
