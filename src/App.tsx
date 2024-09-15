/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const USER_ID = 1414;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [userId] = useState(USER_ID);
  const [completed] = useState(false);
  const [hasShownError, setHasShownError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos(userId)
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        const timeoutId = setTimeout(() => {
          setError(''); // Clear error after 3 seconds
          setHasShownError(true); // Mark that the error has been shown
        }, 3000);

        return () => clearTimeout(timeoutId);
      })
      .finally(() => setLoading(false));
  }, [userId, filter, error, hasShownError]);

  const reset = () => {
    setTitle('');
    setError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitle(title);

    if (!title) {
      setError('Title should not be empty');

      return;
    }

    createTodo({
      title,
      userId,
      completed,
    })
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
        reset();
      })
      .catch(() => setError('Unable to add a todo'));
  };

  const handleToggle = (todoId: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setError('');
  };

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const hasCompleted = todos.some(todo => todo.completed);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      {!loading && (
        <>
          <div className="todoapp__content">
            <header className="todoapp__header">
              {todos.length > 0 && (
                <button
                  type="button"
                  data-cy="ToggleAllButton"
                  className={classNames('todoapp__toggle-all', {
                    active: isAllCompleted,
                  })}
                />
              )}

              <form
                action="api/todos"
                method="POST"
                onSubmit={handleSubmit}
                onReset={reset}
              >
                <input
                  data-cy="NewTodoField"
                  type="text"
                  className="todoapp__new-todo"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={handleTitleChange}
                />
              </form>
            </header>

            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <div
                  data-cy="Todo"
                  key={todo.id}
                  className={`todo ${todo.completed ? 'completed' : ''}`}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>

                  {/* overlay will cover the todo while it is being deleted or updated */}

                  <div data-cy="TodoLoader" className="modal overlay">
                    <div
                      className="modal-background
                      has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}

              {/* This todo is being edited */}
              {/* <div data-cy="Todo" className="todo">
                 <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label> */}

              {/* This form is shown instead of the title and remove button */}
              {/* <form>
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
              </div>*/}

              {/* This todo is in loadind state */}
              {/* <div data-cy="Todo" className="todo">
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
                </button> */}

              {/* 'is-active' class puts this modal on top of the todo */}
              {/* <div data-cy="TodoLoader" className="modal overlay is-active">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div> */}
              {/* </div> */}
            </section>

            {todos.length > 0 && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {todos.filter(todo => !todo.completed).length} items left
                </span>

                <nav className="filter" data-cy="Filter">
                  <a
                    href="#/"
                    className={classNames('filter__link', {
                      selected: filter === 'all',
                    })}
                    data-cy="FilterLinkAll"
                    onClick={() => handleFilterChange('all')}
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    className={classNames('filter__link', {
                      selected: filter === 'active',
                    })}
                    data-cy="FilterLinkActive"
                    onClick={() => handleFilterChange('active')}
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    className={classNames('filter__link', {
                      selected: filter === 'completed',
                    })}
                    data-cy="FilterLinkCompleted"
                    onClick={() => handleFilterChange('completed')}
                  >
                    Completed
                  </a>
                </nav>

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
        </>
      )}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        <div>{error}</div>
        {/*
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
