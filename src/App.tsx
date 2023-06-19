/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './App.scss';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { TodosList } from './components/TodosList/TodosList';
import { Todo } from './types/Todo';
import { ErrorInfo } from './components/ErrorInfo/ErrorInfo';
import { StatusValue } from './types/StatusValue';
import { visibleTodos } from './utils/todoUtils';

const USER_ID = 10725;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusTodo, setStatusTodo] = useState<StatusValue>(StatusValue.ALL);
  const [visibleError, setVisibleError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(todo => (setTodos(todo as Todo[])))
      .catch(() => {
        setVisibleError('Unable to load a todos');
      });
  }, []);

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
            className="todoapp__toggle-all active"
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

        <TodosList
          todos={visibleTodos(todos, statusTodo)}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: statusTodo === StatusValue.ALL,
                })}
                defaultValue="all"
                onClick={() => setStatusTodo(StatusValue.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: statusTodo === StatusValue.ACTIVE,
                })}
                onClick={() => setStatusTodo(StatusValue.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: statusTodo === StatusValue.COMPLETED,
                })}
                onClick={() => setStatusTodo(StatusValue.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorInfo
        visibleError={visibleError}
        setVisibleError={setVisibleError}
      />
    </div>
  );
};
