/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { ERROR_MESSAGES, FILTERS } from './utils/constants';
import cn from 'classnames';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredField, setFiltredField] = useState<FILTERS>(FILTERS.ALL);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const completedCount = useMemo(
    () => todos.filter(t => t.completed).length,
    [todos],
  );

  const filtredTodos = useMemo(() => {
    let filtered: Todo[];

    switch (filtredField) {
      case FILTERS.ALL:
        filtered = todos;
        break;

      case FILTERS.ACTIVE:
        filtered = todos.filter(t => !t.completed);
        break;

      case FILTERS.COMPLETED:
        filtered = todos.filter(t => t.completed);
        break;

      default:
        filtered = todos;
    }

    return filtered;
  }, [todos, filtredField]);

  const showError = (message: string) => {
    setError(message);

    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    getTodos()
      .then(result => {
        setTodos(result);
      })
      .catch(() => showError(ERROR_MESSAGES.LOAD_TODOS));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const deleteErrors = () => {
    setError(null);
  };

  const onFiltr = (field: FILTERS) => {
    if (field === filtredField) {
      return;
    }

    setFiltredField(field);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: completedCount === todos.length,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={inputRef}
              value={title}
              name="title"
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={e => setTitle(e.target.value)}
            />
          </form>
        </header>
        <TodoList todos={filtredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            activeTodosCount={todos.length - completedCount}
            filtredField={filtredField}
            onFiltr={onFiltr}
            hasCompleted={completedCount > 0}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => deleteErrors()}
        />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
