/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import * as api from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 104;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const existingCompeted = todos.some((value) => {
    return value.completed;
  });

  const nonCompetedTodos = todos.reduce((counter, value) => {
    if (!value.completed) {
      return counter + 1;
    }

    return counter;
  }, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleFilter = (query: string): Todo[] => {
    switch (query) {
      case 'active':
        return todos.filter((todo) => {
          return todo.completed === false;
        });
      case 'completed':
        return todos.filter((todo) => {
          return todo.completed === true;
        });
      case 'all':
        return todos;
      default:
        return todos;
    }
  };

  useEffect(() => {
    api.getTodos(USER_ID)
      .then((response) => {
        setTodos(response);
        setFilteredTodos(response);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map((value) => (
            <div
              data-cy="Todo"
              key={value.id}
              className={cn('todo', {
                completed: value.completed,
              })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={value.completed}
                  onChange={() => null}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {value.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  api.deletTodos(value.id);
                }}
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

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${nonCompetedTodos} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filter === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  setFilteredTodos(handleFilter('all'));
                  setFilter('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filter === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  setFilteredTodos(handleFilter('active'));
                  setFilter('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  setFilteredTodos(handleFilter('completed'));
                  setFilter('completed');
                }}
              >
                Completed
              </a>
            </nav>

            {existingCompeted && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal', {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setError('');
          }}
        />
        Unable to load todos
      </div>
    </div>
  );
};
