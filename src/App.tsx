/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoFilter, StatusOfFilter } from './components/TodoFilter';

const USER_ID = 9948;

enum ErrorType {
  Server = 'Unable to fetch todos',
  Validation = "Title can't be empty",
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(StatusOfFilter.All);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [value, setValue] = useState('');
  const completedTodos = todos.filter(todo => todo.completed);
  const notCompletedTodos = todos.filter(todo => !todo.completed);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const data = await getTodos(USER_ID);

        setTodos(data);
      } catch (error) {
        setErrorMessage(ErrorType.Server);
      }
    }

    fetchTodos();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  const updatedTodos = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (event.target.value) {
        updatedTodos({
          id: +new Date(),
          userId: USER_ID,
          title: event.target.value,
          completed: false,
        });
      } else {
        setErrorMessage(ErrorType.Validation);
      }

      setValue('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case StatusOfFilter.Active:
        return !todo.completed;
      case StatusOfFilter.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                {
                  active: completedTodos.length > 0,
                },
              )}
            />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              <TodoList todos={filteredTodos} />
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">
                {notCompletedTodos.length === 1 ? '1 item left' : `${notCompletedTodos.length} items left`}
              </span>

              <TodoFilter filter={filter} setFilter={setFilter} />

              {completedTodos.length > 0 ? (
                <button
                  type="button"
                  className="todoapp__clear-completed"
                >
                  Clear completed
                </button>
              ) : (
                <button
                  style={{ visibility: 'hidden' }}
                  type="button"
                  className="todoapp__clear-completed"
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      <div className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: errorMessage === '' },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
