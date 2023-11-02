import React, { useState } from 'react';
import { initialValue, ActionState } from './types/helpers';
import { Todo } from './types/Todo';

export const TodosContext = React.createContext(initialValue);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState(ActionState.ALL);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const visibleTodos = todos.filter((todo: Todo) => {
    switch (filterTodos) {
      case ActionState.ACTIVE:
        return !todo.completed;
      case ActionState.COMPLETED:
        return todo.completed;
      default: return true;
    }
  });

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        filterTodos,
        setFilterTodos,
        visibleTodos,
        errorMessage,
        setErrorMessage,
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
