/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoFooter } from './components/TodoFooter/TodoFooter';

const USER_ID = 11527;

export const App: React.FC = () => {
  /* if (!USER_ID) {
    return <UserWarning />;
  } */

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        setErrorMessage('Some download errors');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        throw error;
      });
  }, []);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

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

        <TodoList todos={todos} />

        {/* Hide the footer if there are no todos */}
        <TodoFooter
          activeTodosCount={activeTodosCount}
          completedTodosCount={completedTodosCount}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(errorMessage)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
