/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api/todos';
import { TodoFilter } from './components/TodoFilter';
import { ErrorType } from './types/ErrorMessage';

const USER_ID = 11356;

function getFilteredTodos(
  todos: Todo[],
  sortBy: string,
) {
  const filteredTodos = todos;

  switch (sortBy) {
    case Status.ALL:
      return filteredTodos;

    case Status.ACTIVE:
      return filteredTodos.filter(todo => todo.completed === false);

    case Status.COMPLETED:
      return filteredTodos.filter(todo => todo.completed === true);

    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<string>(Status.ALL);
  const [errorMessage, setErrorMessage] = useState(ErrorType.None);
  const [isMessageClosed, setIsMessageClosed] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorType.LoadingError);
        setIsMessageClosed(false);
        setTimeout(() => {
          setIsMessageClosed(true);
        }, 3000);
      });
  }, []);

  const filteredTodos = getFilteredTodos(todos, status);
  const itemsLeft = getFilteredTodos(todos, Status.ACTIVE);
  const completedTodos = getFilteredTodos(todos, Status.COMPLETED);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: itemsLeft.length === 0,
            })}
          />
          <form onSubmit={() => setIsMessageClosed(true)}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {filteredTodos.map(todo => (
            <div
              className={classNames('todo', {
                completed: todo.completed,
              })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span className="todo__title">{todo.title}</span>

              <button type="button" className="todo__remove">×</button>

              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${itemsLeft.length} items left`}
            </span>

            <TodoFilter setStatus={setStatus} status={status} />

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
              hidden: isMessageClosed,
            },
          )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => {
              setIsMessageClosed(true);
            }}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
