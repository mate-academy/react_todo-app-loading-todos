/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { ErrorNotify } from './components/ErrorNotify/ErrorNotify';
import { Filter } from './components/Filter/Filter';
import { FilterType } from './types/FilterType';
import { filterTodos } from './utils/helpers';

const USER_ID = 12041;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors | null>(null);
  const [filterType, setFilterType] = useState(FilterType.All);

  const onErrorNotifyClose = () => {
    setError(null);
  };

  const onFilterSelect = (filterT: FilterType) => {
    setFilterType(filterT);
  };

  useEffect(() => {
    const renderTodos = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (e) {
        setError('Unable to load todos');
        setTimeout(() => {
          setError(null);
        }, 3000);
        throw e;
      }
    };

    renderTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, filterType);
  }, [filterType, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <Filter
            filterType={filterType}
            onFilterSelect={onFilterSelect}
            todos={todos}
          />
        )}
      </div>

      <ErrorNotify
        error={error}
        onClose={onErrorNotifyClose}
      />
    </div>
  );
};
