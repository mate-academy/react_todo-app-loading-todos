import React, { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { StateFilter } from '../../types/StateFilter';

export const TodoContext = React.createContext<({
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  selectedState: StateFilter,
  setSelectedState: React.Dispatch<React.SetStateAction<StateFilter>>,
})>({
    todos: [],
    setTodos: () => {},
    selectedState: StateFilter.All,
    setSelectedState: () => {},
  });

type Props = {
  children: React.ReactNode,
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedState, setSelectedState] = useState(StateFilter.All);

  const value = useMemo(() => ({
    todos,
    setTodos,
    selectedState,
    setSelectedState,
  }), [todos, selectedState]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
