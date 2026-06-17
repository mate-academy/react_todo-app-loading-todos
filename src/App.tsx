/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(`https://mate.academy/students-api/todos?userId=${USER_ID}`)
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage(Errors.Load);
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const visibleTodos = todos.filter((todo: Todo) => {
    if (filter === 'Active') {
      return todo.completed === false;
    }

    if (filter === 'Completed') {
      return todo.completed === true;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList visibleTodos={visibleTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
