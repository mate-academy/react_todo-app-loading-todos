/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList.ts/TodoList';
import { Notification } from './components/Notification/Notification';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

const USER_ID = 10919;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [completionStatus, setCompletionStatus] = useState('All');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  const visibleTodos = useMemo(() => {
    switch (completionStatus) {
      case 'All':
        return todos;
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, completionStatus]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.length} items left`}
            </span>

            <TodoFilter
              completionStatus={completionStatus}
              setCompletionStatus={setCompletionStatus}
            />

            {/* don't show this button if there are no completed todos */}
            {/* <button
              type="button"
              className="todoapp__clear-completed"
              hidden={!todos.find(todo => todo.completed)}
            >
              Clear completed
            </button> */}
            <button
              type="button"
              className={cn({
                'todoapp__clear-completed': todos.some(todo => todo.completed),
                'todoapp__clear-hidden': !todos.some(todo => todo.completed),
              })}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      {error.length > 0 && <Notification error={error} setError={setError} />}
    </div>
  );
};
