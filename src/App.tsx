/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';

import { TodoList } from './components/todoList/TodoList';
import { getFilteredData } from './helpres/helpers';
import { FilterTypes } from './enum/FilterTypes';
import { useTodosContext } from './context/context';
import { TodoForm } from './components/todoForm/TodoForm';
import { FilterFooter } from './components/filterFooter/FilterFooter';
import { ErrorSection } from './components/errorSection/ErrorSection';

export const App: React.FC = () => {
  const { todos, setTodos, setErrorMessage } = useTodosContext();
  const [filter, setFilter] = useState(FilterTypes.All);

  const handleFilterChange = (filterType: FilterTypes) => {
    setFilter(filterType);
  };

  const displayedTodos = getFilteredData(todos, filter);

  async function getTodosList() {
    try {
      const todosData = await getTodos();

      setTodos(todosData);
    } catch (error) {
      setErrorMessage('Unable to load todos');
      throw error;
    }
  }

  useEffect(() => {
    getTodosList();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoForm todos={todos} />
        {todos.length > 0 && <TodoList todoList={displayedTodos} />}
        {todos.length > 0 && (
          <FilterFooter handleFilterChange={handleFilterChange} />
        )}
      </div>
      <ErrorSection />
    </div>
  );
};
