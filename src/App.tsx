/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { getTodos } from './api/todos';

const USER_ID = 11368;

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  function hideError() {
    setTimeout(() => setErrorMessage(''), 3000);
  }

  useEffect(() => {
    getTodos(USER_ID)
      .then((currentTodo) => {
        setTodo(currentTodo);
      })
      .catch(() => {
        setErrorMessage('Unable to load Todo');
        hideError();
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={todos} />

        <TodoFooter
          todos={todos}
          setTodo={setTodo}
        />

      </div>

      {errorMessage
        && (
          <div className="
            notification is-danger
            is-light
            has-text-weight-normal"
          >
            <button type="button" className="delete" />
            {errorMessage}
          </div>
        )}
    </div>
  );
};
