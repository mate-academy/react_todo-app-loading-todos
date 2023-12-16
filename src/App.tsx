/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { UserWarning } from './UserWarning';
import { TodoAllChecked } from './components/TodoAllChecked';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoContext } from './components/TodoContext';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

export const USER_ID = 12048;

export const App: React.FC = () => {
  const { errorMessage, closeErrorMessage } = useContext(TodoContext);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <TodoAllChecked />

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

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList />
        </section>

        {/* Hide the footer if there are no todos */}
        {}
        <TodoFooter />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage message={errorMessage} onClose={closeErrorMessage} />
    </div>
  );
};
