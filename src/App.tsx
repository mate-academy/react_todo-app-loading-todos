import React, { useEffect, useMemo, useState } from 'react';

import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { wait } from './utils/fetchClient';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { getFilterTodos } from './utils/getFilterTodos';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<Status>(Status.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        wait(3000).then(() => setErrorMessage(''));
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilterTodos(todos, status);
  }, [todos, status]);

  const filterUncompletedTodos = (): Todo[] => {
    return todos.filter(item => !item.completed);
  };

  const handleSetStatus = (field: Status) => {
    setStatus(field);
  };

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

        <TodoList filteredTodos={filteredTodos} />
        {!!todos.length && (
          <Footer
            onFilter={handleSetStatus}
            onUncompletedTodos={filterUncompletedTodos}
            currentFilterStatus={status}
          />
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
