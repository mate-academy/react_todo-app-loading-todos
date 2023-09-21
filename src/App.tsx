/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import cn from 'classnames';

const USER_ID = 11563;

type Filter = 'all' | 'active' | 'completed';

enum Errors {
 loading = 'Unable to load todos',
 requiredTitle = 'Title should not be empty',
 adding = 'Unable to add a todo',
 deleting = 'Unable to delete a todo',
 updating = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const fetchData = async () => {
    try {
      const allTodos = getTodos(USER_ID);

      setTodos(await allTodos);
    } catch (e) {
      setError(Errors.loading);
      setTimeout(() => setError(null), 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onFilter = (filter: Filter) => {
    setFilter(filter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

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

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

          {todos && (<TodoList selectedFilter={filter} todos={todos}/>)}

          {todos.length !== 0
          && (
            <TodoFilter onFilter={onFilter} todos={todos} />
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
