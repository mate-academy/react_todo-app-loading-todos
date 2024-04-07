/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import ErrorNotification from './components/Error/ErrorNotification';
import { useTodos } from './components/Store/Store';

export const App: React.FC = () => {
  const { filteredTodos, errorMessage } = useTodos();

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
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {filteredTodos.length > 0 && <TodoList />}

        <Footer />
      </div>

      {errorMessage && <ErrorNotification />}
    </div>
  );
};
