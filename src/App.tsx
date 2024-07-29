/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as apiTodos from './api/todos';
import classNames from 'classnames';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [todoStatus, setTodoStatus] = useState<Status>('All');
  const [submitting, setSubmitting] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const formField = useRef<HTMLInputElement>(null);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setErrorMessage('');
  }

  function resetError() {
    setErrorMessage('');
  }

  function resetTitle() {
    setTitle('');
  }

  async function addTodo(todo: Omit<Todo, 'id'>) {
    try {
      setSubmitting(true);

      setTempTodo({ ...todo, id: 0 });

      const newTodo = await apiTodos.addTodo(todo);

      setTodos(currentTodos => [...currentTodos, newTodo]);
    } catch (error) {
      setErrorMessage('Unable to add a todo');
      setTimeout(resetError, 3000);
      throw error;
    } finally {
      setTempTodo(null);
      setSubmitting(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title) {
      setErrorMessage('Title should not be empty');
      setTimeout(resetError, 3000);

      return;
    }

    addTodo({
      userId: USER_ID,
      title,
      completed,
    }).then(resetTitle);
  }

  const filteredTodos: Todo[] = useMemo(() => {
    return todos.filter(todo => {
      switch (todoStatus) {
        case 'Active':
          return !todo.completed;

        case 'Completed':
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, todoStatus]);

  const hasCompleted = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const allCompleted = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  useEffect(() => {
    apiTodos
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(resetError, 3000);
      });
  }, []);

  useEffect(() => {
    formField.current?.focus();
  }, [todos, errorMessage]);

  const activeTodosCount = useMemo(() => {
    return todos.reduce((sum, todo) => sum + Number(!todo.completed), 0);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: allCompleted,
            })}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleSubmit}>
            <input
              ref={formField}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleTitleChange}
              disabled={submitting}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={classNames('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={event => setCompleted(event.target.checked)}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div
                data-cy="TodoLoader"
                className={classNames('modal', 'overlay', {
                  'is-active': false,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}

          {tempTodo && (
            <div data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {tempTodo?.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          )}

          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
        </section>

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {['All', 'Active', 'Completed'].map(status => (
                <a
                  key={status}
                  href={`#/${status}`}
                  className={classNames('filter__link', {
                    selected: status === todoStatus,
                  })}
                  data-cy={`FilterLink${status}`}
                  onClick={() => setTodoStatus(status as Status)}
                >
                  {status}
                </a>
              ))}
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
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
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
        {/* <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
