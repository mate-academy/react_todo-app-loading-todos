/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID, posttTodo, delTodos, patchTodo } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [todos, setTodos] = useState<Todo[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [query, setQuery] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [filter, setFilter] = useState<FilterStatus>('all');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  function showError(message: string) {
    setError(message);

    setTimeout(() => {
      setError('');
    }, 3000);
  }

  function updateTodo(
    todo: Todo,
    changes: Partial<Pick<Todo, 'title' | 'completed'>>,
  ) {
    setError('');
    setLoadingTodoIds(ids => [...ids, todo.id]);

    patchTodo(todo.id, changes)
      .then(updatedTodo => {
        setTodos(prev =>
          prev.map(t => (t.id === updatedTodo.id ? updatedTodo : t)),
        );
      })
      .catch(() => {
        showError('Unable to update a todo');
      })
      .finally(() => {
        setLoadingTodoIds(ids => ids.filter(id => id !== todo.id));
      });
  }

  function addTodo(title: string) {
    setError('');

    posttTodo(title)
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
      })
      .catch(() => {
        showError('Unable to add a todo');
      });
  }

  function deletTodo(todoId: number) {
    setError('');

    delTodos(todoId)
      .then(() => {
        setTodos(current => current.filter(todo => todo.id !== todoId));
      })
      .catch(() => {
        showError('Unable to delete a todo');
      });
  }

  function clearCompleted() {
    setError('');

    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => {
      delTodos(todo.id)
        .then(() => {
          setTodos(current => current.filter(t => t.id !== todo.id));
        })
        .catch(() => {
          showError('Unable to delete a todo');
        });
    });
  }

  function handleToggle(todo: Todo) {
    updateTodo(todo, { completed: !todo.completed });
  }

  function allComplited() {
    if (!allCompleted) {
      const noCompletedTodos = todos.filter(todo => !todo.completed);

      noCompletedTodos.forEach(todo => {
        handleToggle(todo);
      });
    } else {
      todos.forEach(todo => {
        handleToggle(todo);
      });
    }
  }

  function handleEditStart(todo: Todo) {
    setEditingTodoId(todo.id);
    setQuery(todo.title);
  }

  function handleRenameSubmit(
    event: React.FormEvent | React.FocusEvent,
    todo: Todo,
  ) {
    event.preventDefault();

    const newTitle = query.trim();

    setEditingTodoId(null);

    if (!newTitle) {
      deletTodo(todo.id);

      return;
    }

    if (newTitle === todo.title) {
      return;
    }

    updateTodo(todo, { title: newTitle });
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setError('');

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        showError('Unable to load todos');
        setTodos([]);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    addTodo(query.trim());
    setQuery('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={() => allComplited()}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={event => setQuery(event.target.value)}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos?.map(todo => (
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
                  onClick={() => handleToggle(todo)}
                />
              </label>

              {editingTodoId !== todo.id ? (
                <>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => handleEditStart(todo)}
                  >
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => deletTodo(todo.id)}
                  >
                    ×
                  </button>
                </>
              ) : (
                <form onSubmit={e => handleRenameSubmit(e, todo)}>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={query}
                    autoFocus
                    onChange={e => setQuery(e.target.value)}
                    onBlur={e => handleRenameSubmit(e, todo)}
                  />
                </form>
              )}

              <div
                data-cy="TodoLoader"
                className={classNames('modal overlay', {
                  'is-active': loadingTodoIds.includes(todo.id),
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => clearCompleted()}
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
      </div>
    </div>
  );
};
