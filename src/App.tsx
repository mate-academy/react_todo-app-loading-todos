/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import CN from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter/Filter';

const USER_ID = 10349;

enum Options {
  ALL = 'all',
  ACTIVE = 'active',
  COMLETED = 'comleted',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [option, setOption] = useState(Options.ALL);
  const [error, setError] = useState('test error');

  const visibleTodos = todos.filter(todo => {
    switch (option) {
      case Options.ACTIVE:
        return todo.completed;
      case Options.COMLETED:
        return !todo.completed;
      default:
        return todo;
    }
  });

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(errorMessage => setError(errorMessage));
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error) {
      timeout = setTimeout(() => {
        return setError('');
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const handleOption = useCallback((value: Options) => {
    setOption(value);
  }, []);

  const isActiveTodo = visibleTodos.some(todo => {
    return !todo.completed;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className={CN(
              'todoapp__toggle-all',
              { active: isActiveTodo },
            )}
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {todos.length && (
          <>
            <TodoList visibleTodos={visibleTodos} />

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${todos.length} items left`}
              </span>

              <Filter option={option} onFilterChange={handleOption} />

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className={CN(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !error },
      )}
      >

        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />

        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
