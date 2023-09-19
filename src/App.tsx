/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { FilterTodos } from './types/FilterTodos';
import { ErrorType } from './types/Errormessage';
import { getTodos } from './api/todos';
import { TodoFilter } from './components/TodoFilter';

const USER_ID = 11500;

function getFilteredTodos(
  todos: Todo[],
  sortBy: string,
) {
  switch (sortBy) {
    case FilterTodos.All:
      return todos;

    case FilterTodos.Active:
      return todos.filter(todo => todo.completed === false);

    case FilterTodos.Completed:
      return todos.filter(todo => todo.completed === true);

    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<string>(FilterTodos.All);
  const [errorMessage, setErrorMessage] = useState(ErrorType.None);
  const [isErrorClosed, setIsErrorClosed] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorType.LoadingError);
        setIsErrorClosed(false);
        setTimeout(() => {
          setIsErrorClosed(true);
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = getFilteredTodos(todos, filterTodos);
  const activeTodos = getFilteredTodos(todos, FilterTodos.Active);
  const completedTodos = getFilteredTodos(todos, FilterTodos.Completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: activeTodos.length === 0,
            })}
          />

          <form onSubmit={() => setIsErrorClosed(true)}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {filteredTodos.map(todo => {
            const { id, completed, title } = todo;

            return (
              <div
                className={classNames('todo', {
                  completed: todo.completed,
                })}
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                  />
                </label>

                <span className="todo__title">{title}</span>

                <button type="button" className="todo__remove">×</button>

                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos.length} items left`}
            </span>

            <TodoFilter
              setFilterTodos={setFilterTodos}
              filterTodos={filterTodos}
            />

            {completedTodos.length > 0 && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}

          </footer>
        )}
      </div>

      {errorMessage && (
        <div
          className={classNames(
            'notification is-danger is-light has-text-weight-normal', {
              hidden: isErrorClosed,
            },
          )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => {
              setIsErrorClosed(true);
            }}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
