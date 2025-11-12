/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import {
  TodoStatusOption,
  todoStatusOptions,
  TodoStatusOptions,
} from './types/TodoStatusOption';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatusOption>(TodoStatusOptions.ALL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const newTodoField = useRef<HTMLInputElement>(null);

  const getWindowHash = (): TodoStatusOption => {
    const hash = window.location.hash.slice(2);

    return todoStatusOptions.includes(hash)
      ? (hash as TodoStatusOption)
      : TodoStatusOptions.ALL;
  };

  useEffect(() => {
    const handleHashChange = () => setFilter(getWindowHash());

    window.addEventListener('hashchange', handleHashChange);
    setFilter(getWindowHash());

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    newTodoField.current?.focus();
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    getTodos()
      .then((fetchedTodos: Todo[]) => setTodos(fetchedTodos))
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => setError(''), 3000);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case TodoStatusOptions.ACTIVE:
        return todos.filter(t => !t.completed);
      case TodoStatusOptions.COMPLETED:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const toggleButtonActive = useMemo(() => {
    return todos.length === todos.filter(t => t.completed).length;
  }, [todos]);
  const renderTodosList = !!todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {renderTodosList && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: toggleButtonActive,
              })}
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
              ref={newTodoField}
            />
          </form>
        </header>

        <TodoList visibleTodos={visibleTodos} />

        {!!todos.length && <Footer allTodos={todos} currentFilter={filter} />}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
        {/*
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
        */}
      </div>
    </div>
  );
};
