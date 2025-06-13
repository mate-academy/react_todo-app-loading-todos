/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import * as postService from './api/todos';

export const App: React.FC = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setErrorMessage(null);
    getTodos()
      .then(setData)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const filteredTodos = data.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    } else if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  function createTodo() {
    if (newTodoTitle.trim() === '') {
      setErrorMessage('Title should not be empty');

      return;
    }

    const newTodoData = {
      userId: USER_ID,
      title: newTodoTitle.trim(),
      completed: false,
    };

    setIsSubmitting(true);
    postService.createTodo(newTodoData)
      .then(newTodo => {
        setData(currentTodos => [...currentTodos, newTodo]);
        setNewTodoTitle('');
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function deleteTodo(id: number) {
    setLoading(true);

    postService.deleteTodo(id)
      .then(() => {
        setData(currentTodos => currentTodos.filter(todo => todo.id !== id));
      })
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function deleteCompletedTodos() {
    const completedTodos = data.filter(todo => todo.completed);

    const completedIds = completedTodos.map(todo => todo.id);

    const deletePromises = completedIds.map(id =>
      postService.deleteTodo(id).then(() => id),
    );

    Promise.allSettled(deletePromises)
      .then(results => {
        const successIds = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);

        const isSomeFailed = results.some(
          result => result.status === 'rejected',
        );

        if (isSomeFailed) {
          setErrorMessage('Unable to delete a todo');
        }

        setData(currentTodos => currentTodos.filter(
          todo => !successIds.includes(todo.id)
        ));
      })
      .catch(() => {
        setErrorMessage('Unable to delete completed todos');
      })
      .finally(() => {
        const inputField = document.querySelector(
          '.todoapp__new-todo') as HTMLInputElement;
        if (inputField) {
          inputField.focus();
        }
      });
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {data.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: data.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
              aria-label="Toggle all todos"
            />
          )}

          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                createTodo();
              }
            }}
            disabled={isSubmitting}
          />
        </header>

        {data.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <div
                data-cy="Todo"
                className={classNames('todo', {
                  completed: todo.completed,
                })}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {data.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {data.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === 'All',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('Completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={data.filter(todo => todo.completed).length === 0}
              onClick={deleteCompletedTodos}

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
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
          aria-label="Hide error notification"
        />
        {errorMessage}
      </div>
    </div>
  );
};
