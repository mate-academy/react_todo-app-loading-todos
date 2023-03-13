/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorAction, Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const USER_ID = 6648;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [errorMessage, setErrorMessage] = useState<ErrorAction>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(result => {
        setTodos(result);
      })
      .catch(() => {
        setErrorMessage('load');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos && todos?.length > 0 && (
          <TodoList todos={todos} />
        )}
      </div>

      <Notification
        action={errorMessage}
        onClose={() => setErrorMessage('')}
      />

    </div>
  );
};
