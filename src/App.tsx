/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import {
  addTodos,
  changeTodos,
  deleteTodos,
  editTodos,
  getTodos,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingClear, setLoadingClear] = useState(false);

  const showError = (message: string) => {
    setError(message);

    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const hideError = () => {
    setError('');
  };

  useEffect(() => {
    hideError();

    getTodos()
      .then(setTodos)
      .catch(() => {
        showError('Unable to load todos');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const toggleTodo = (todo: Todo) => {
    if (loadingTodoId !== null || loadingAdd || loadingClear) {
      return;
    }

    hideError();
    setLoadingTodoId(todo.id);

    changeTodos(todo)
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        showError('Unable to update a todo');
      })
      .finally(() => {
        setLoadingTodoId(null);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      showError('Title should not be empty');

      return;
    }

    if (loadingTodoId !== null || loadingAdd || loadingClear) {
      return;
    }

    hideError();
    setLoadingAdd(true);

    addTodos(title)
      .then(() => getTodos())
      .then(setTodos)
      .then(() => {
        setTitle('');
      })
      .catch(() => {
        showError('Unable to add a todo');
      })
      .finally(() => {
        setLoadingAdd(false);
      });
  };

  const handleEditClick = (todo: Todo) => {
    if (loadingTodoId !== null || loadingAdd || loadingClear) {
      return;
    }

    hideError();
    setEditTitle(todo.title);
    setEdit(todo.id);
  };

  const handleEdit = (todo: Todo) => {
    if (loadingTodoId !== null || loadingAdd || loadingClear) {
      return;
    }

    hideError();
    setLoadingTodoId(todo.id);

    if (!editTitle.trim()) {
      deleteTodos(todo)
        .then(() => getTodos())
        .then(setTodos)
        .then(() => {
          setEdit(null);
          setEditTitle('');
        })
        .catch(() => {
          showError('Unable to delete a todo');
        })
        .finally(() => {
          setLoadingTodoId(null);
        });

      return;
    }

    editTodos(todo, editTitle)
      .then(() => getTodos())
      .then(setTodos)
      .then(() => {
        setEdit(null);
        setEditTitle('');
      })
      .catch(() => {
        showError('Unable to update a todo');
      })
      .finally(() => {
        setLoadingTodoId(null);
      });
  };

  const handleDelete = (todo: Todo) => {
    if (loadingTodoId !== null || loadingAdd || loadingClear) {
      return;
    }

    hideError();
    setLoadingTodoId(todo.id);

    deleteTodos(todo)
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        showError('Unable to delete a todo');
      })
      .finally(() => {
        setLoadingTodoId(null);
      });
  };

  const handleClearCompleted = () => {
    if (loadingTodoId !== null || loadingAdd || loadingClear) {
      return;
    }

    const completedTodos = todos.filter(todo => todo.completed);

    if (completedTodos.length === 0) {
      return;
    }

    hideError();
    setLoadingClear(true);

    Promise.all(completedTodos.map(todo => deleteTodos(todo)))
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        showError('Unable to delete a todo');
      })
      .finally(() => {
        setLoadingClear(false);
      });
  };

  const handleFilter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newFilter: Filter,
  ) => {
    event.preventDefault();
    setFilter(newFilter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: todos.length > 0 && todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={event => setTitle(event.target.value)}
              value={title}
              disabled={loadingAdd}
              autoFocus
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <div
                data-cy="Todo"
                key={todo.id}
                className={cn('todo', {
                  completed: todo.completed,
                })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo)}
                    disabled={loadingTodoId !== null || loadingClear}
                  />
                </label>

                {edit === todo.id ? (
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      handleEdit(todo);
                    }}
                  >
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={editTitle}
                      onChange={event => setEditTitle(event.target.value)}
                      disabled={loadingTodoId === todo.id}
                      autoFocus
                    />
                  </form>
                ) : (
                  <>
                    <span
                      onClick={() => handleEditClick(todo)}
                      data-cy="TodoTitle"
                      className="todo__title"
                    >
                      {todo.title}
                    </span>

                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => handleDelete(todo)}
                      disabled={loadingTodoId !== null || loadingClear}
                    >
                      ×
                    </button>
                  </>
                )}

                <div
                  data-cy="TodoLoader"
                  className={cn('modal overlay', {
                    'is-active': loadingTodoId === todo.id,
                  })}
                >
                  <div
                    className={'modal-background ' + 'has-background-white-ter'}
                  />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filter === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={event => handleFilter(event, 'all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filter === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={event => handleFilter(event, 'active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={event => handleFilter(event, 'completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todos.some(todo => todo.completed) || loadingClear}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light ' + 'has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />

        {error}
      </div>
    </div>
  );
};
