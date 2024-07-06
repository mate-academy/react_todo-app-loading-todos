/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.all);

  const [hasError, setHasError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [todosError, setTodosError] = useState<boolean>(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setTodosError(true);
        setHasError(true);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodosByStatus = todos.filter(todo => {
    if (status === Status.active) {
      return !todo.completed;
    }

    if (status === Status.completed) {
      return todo.completed;
    }

    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed);

  function findActiveTodo() {
    return todos.find(todo => todo.completed === false) || false;
  }

  const reset = () => setQuery('');

  const handleSetStatus = (newStatus: Status) => setStatus(newStatus);

  const handleSetError = () => setHasError(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasError(false);
    setTitleError(false);

    const todo = {
      id: todos.length,
      userId: USER_ID,
      title: query,
      completed: false,
    };

    if (!query) {
      setHasError(true);
      setTitleError(true);

      return;
    }

    setTodos([...todos, todo]);

    reset();
  };

  if (hasError) {
    setTimeout(() => setHasError(false), 3000);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: findActiveTodo(),
            })}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </form>
        </header>

        <TodoList filteredTodos={filteredTodosByStatus} />

        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            status={status}
            setStatus={handleSetStatus}
          />
        )}
      </div>

      <ErrorNotification
        hasError={hasError}
        setHasError={handleSetError}
        titleError={titleError}
        todosError={todosError}
      />
    </div>
  );
};
