/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ListOfTodos } from './components/ListOfTodos/ListOfTodos';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { FilterForTodos } from './components/FilterForTodos/FilterForTodos';
import { FilterStatus } from './types/FilterStatus';

const USER_ID = 6984;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.all);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const unfinishedTodos = todos.filter(todo => !todo.completed);

  useEffect(() => {
    getTodos(USER_ID)
      .then(result => setTodos(result))
      .catch(() => setError('Unable to load the list'));
  }, []);

  useEffect(() => {
    const currentTodos = todos.filter((todo) => {
      switch (filter) {
        case FilterStatus.active:
          return !todo.completed;

        case FilterStatus.completed:
          return todo.completed;

        default:
          return todo;
      }
    });

    setFilteredTodos(currentTodos);
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              <ListOfTodos todos={filteredTodos} />
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${unfinishedTodos.length} items left`}
              </span>

              <FilterForTodos filter={filter} onFilterChange={setFilter} />

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <ErrorNotification error={error} onClear={() => setError('')} />
    </div>
  );
};
