/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { TodoError } from './types/TodoErrors';
import { TodoFilter } from './types/TodoFilter';
import { TodoItem } from './components/TodoItem';
import { HeaderTodo } from './components/HeaderTodo';
import { FooterTodo } from './components/FooterTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<TodoError>(TodoError.None);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);

  const hideError = () => setErrorMessage(TodoError.None);

  function loadTodos() {
    setErrorMessage(TodoError.None);
    setLoading(true);

    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(TodoError.LoadTodos))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (errorMessage === TodoError.None) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage(TodoError.None);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case TodoFilter.Active:
        return !todo.completed;
      case TodoFilter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const allCompleted =
    Boolean(todos.length) && todos.every(todo => todo.completed);
  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodo allCompleted={allCompleted} />

        {!loading && Boolean(todos.length) && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />
              ))}
            </section>

            <FooterTodo
              activeCount={activeCount}
              filter={filter}
              hasCompleted={hasCompleted}
              onFilterChange={setFilter}
            />
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
