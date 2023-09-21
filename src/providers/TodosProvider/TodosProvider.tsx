import { createContext, useState } from 'react';
import { useTodos } from '../../CustomHooks/useTodos';
import { TodoType } from '../../types/Todo';
import { TodosContextType } from './types';
import { Filters } from '../../types/Filters';

export const TodosContext
= createContext<TodosContextType>({
  todos: [] as TodoType[],
  loadingTodos: false,
  handleFilter: () => 'all',
  filteredTodos: [],
  filter: 'all',
});

export const TodosProvider = ({ children }: React.PropsWithChildren) => {
  const { todos, loadingTodos } = useTodos();
  const [filter, setFilter] = useState<Filters>('all');

  const handleFilter = (fil: Filters) => {
    setFilter(fil);
  };

  const visibleTodos = (fil: Filters) => {
    if (fil === 'active') {
      return todos.filter(todo => todo.completed === false);
    }

    if (fil === 'completed') {
      return todos.filter(todo => todo.completed === true);
    }

    return todos;
  };

  const filteredTodos = visibleTodos(filter);

  return (
    <TodosContext.Provider value={{
      todos,
      loadingTodos,
      handleFilter,
      filteredTodos,
      filter,
    }}
    >
      <>{children}</>
    </TodosContext.Provider>
  );
};
