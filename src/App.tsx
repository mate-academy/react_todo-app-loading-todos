/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  addTodos,
  deleteTodos,
  getTodos,
  updateTodos,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

type FilterType = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterType>('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [title, setTitle] = useState('');
  const [edittingTitle, setEdittingTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorMessage('');
  };

  const handleComplete = (todoToUpdate: Todo) => {
    setLoadingIds(prev => [...prev, todoToUpdate.id]);

    updateTodos({
      userId: USER_ID,
      title: todoToUpdate.title,
      id: todoToUpdate.id,
      completed: !todoToUpdate.completed,
    })
      .then(() =>
        setTodos(prev =>
          prev.map(updatedTodo =>
            updatedTodo.id === todoToUpdate.id
              ? { ...updatedTodo, completed: !updatedTodo.completed }
              : updatedTodo,
          ),
        ),
      )
      .finally(() =>
        setLoadingIds(prev => prev.filter(id => id !== todoToUpdate.id)),
      );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const todoId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    if (!title) {
      setErrorMessage('Title should not be empty');

      return;
    }

    setErrorMessage('');

    addTodos({
      id: todoId,
      title: title.trim(),
      userId: USER_ID,
      completed: false,
    })
      .then(created => {
        setTodos(prev => [...prev, created]);
        setTitle('');
      })
      .catch(error => {
        setErrorMessage('Unable to add todos');
        throw error;
      });
  };

  function loadTodos() {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      });
  }

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (errorMessage === '') {
      return;
    }

    setTimeout(() => setErrorMessage(''), 3000);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleDelete = (todo: Todo) => {
    const todoToDelete = todo.id;

    setLoadingIds(prev => [...prev, todoToDelete]);

    deleteTodos(todoToDelete)
      .then(() =>
        setTodos(prev => prev.filter(prevTodo => prevTodo.id !== todoToDelete)),
      )
      .catch(error => {
        setErrorMessage('Unable to delete a todo');

        setLoadingIds(prev => prev.filter(id => id !== todoToDelete));

        throw error;
      })
      .finally(() =>
        setLoadingIds(prev => prev.filter(id => id !== todoToDelete)),
      );
  };

  const handleToggleAll = () => {
    const statusToSet = !allCompleted;

    const todosToUpdate = todos.filter(todo => todo.completed !== statusToSet);

    if (todosToUpdate.length === 0) {
      return;
    }

    const idsToUpdate = todosToUpdate.map(todo => todo.id);

    setLoadingIds(prev => [...prev, ...idsToUpdate]);

    const promises = todosToUpdate.map(todo =>
      updateTodos({
        userId: USER_ID,
        title: todo.title,
        id: todo.id,
        completed: statusToSet,
      }),
    );

    Promise.all(promises)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(todo => {
            if (idsToUpdate.includes(todo.id)) {
              return { ...todo, completed: statusToSet };
            }

            return todo;
          }),
        );
      })
      .catch(error => {
        setErrorMessage('Unable to update todos');

        throw error;
      })
      .finally(() => {
        setLoadingIds(prev => prev.filter(id => !idsToUpdate.includes(id)));
      });
  };

  const saveTodo = (
    id: number,
    currentTitle: string,
    currentCompleted: boolean,
  ) => {
    const normalizedTitle = edittingTitle.trim();

    if (editingId === null) {
      return;
    }

    if (!normalizedTitle) {
      handleDelete({ id } as Todo);
      setEditingId(null);

      return;
    }

    if (normalizedTitle === currentTitle) {
      setEditingId(null);

      return;
    }

    setLoadingIds(prev => [...prev, id]);

    updateTodos({
      userId: USER_ID,
      title: normalizedTitle,
      id: id,
      completed: currentCompleted,
    })
      .then(() => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, title: normalizedTitle } : todo,
          ),
        );
        setEditingId(null);
      })
      .catch(() => setErrorMessage('Unable to update a todo'))
      .finally(() => {
        setLoadingIds(prev => prev.filter(loadingId => loadingId !== id));
      });
  };

  const handleKeyUp = (event: React.KeyboardEvent, todo: Todo) => {
    if (event.key === 'Escape') {
      setEditingId(null);
      setEdittingTitle(todo.title);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: allCompleted,
            })}
            onClick={handleToggleAll}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleTitleChange}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => {
            const isEditing = editingId === todo.id;

            return (
              <div
                data-cy="Todo"
                className={classNames('todo', { completed: todo.completed })}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onClick={() => handleComplete(todo)}
                  />
                </label>

                {isEditing ? (
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      saveTodo(todo.id, todo.title, todo.completed);
                    }}
                  >
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={edittingTitle}
                      autoFocus
                      onChange={event => setEdittingTitle(event.target.value)}
                      onBlur={() =>
                        saveTodo(todo.id, todo.title, todo.completed)
                      }
                      onKeyUp={event => handleKeyUp(event, todo)}
                    />
                  </form>
                ) : (
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => {
                      setEditingId(todo.id);
                      setEdittingTitle(todo.title);
                    }}
                  >
                    {todo.title}
                  </span>
                )}

                {!isEditing && (
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleDelete(todo)}
                  >
                    ×
                  </button>
                )}
                <div
                  data-cy="TodoLoader"
                  className={classNames('modal overlay', {
                    'is-active': loadingIds.includes(todo.id),
                  })}
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todos.filter(todo => todo.completed === false).length}`} items
              left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterBy === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterBy('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterBy === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterBy('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterBy === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterBy('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => {
                todos.map(todo => {
                  if (todo.completed === true) {
                    handleDelete(todo);
                  }
                });
              }}
              disabled={!todos.some(todo => todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: errorMessage === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
