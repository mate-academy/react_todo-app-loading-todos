/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { TodoList } from './components/TodoList';
import { FooterFilter } from './components/FooterFilter';
import { Filter } from './types/Filter';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';

const USER_ID = 11551;

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors | null>(null);

  const fetchData = async () => {
    try {
      const todoss = getTodos(USER_ID);

      setTodos(await todoss);
    } catch (e) {
      setError(Errors.load);
      setTimeout(() => setError(null), 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.filter(todo => !todo.completed).length !== 0
            && (
              <button
                type="button"
                className="todoapp__toggle-all active"
                data-cy="ToggleAllButton"
              />
            )}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos && (<TodoList filter={filter} todos={todos} />)}

        {todos.length !== 0
          && (
            <FooterFilter handleFilter={handleFilter} todos={todos} />
          )}

      </div>

      <div
        data-cy="ErrorNotification"
        className={cn('notification is-danger is-light has-text-weight-normal',
          { hidden: error === null })}
      >
        {error
          && (
            <button
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={() => setError(null)}
            />
          )}
        {error}
      </div>
    </div>
  );
};
