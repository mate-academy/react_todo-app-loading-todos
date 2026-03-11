/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { ErrorMessage } from './types/ErrorMessage';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.Empty);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(ErrorMessage.Load);
        setTimeout(() => setError(ErrorMessage.Empty), 3000);
      });
  }, []);

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

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList todos={todos} filter={filter} />}

        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            filter={filter}
            onFilterChange={setFilter}
          />
        )}
      </div>

      <ErrorNotification
        error={error}
        onClose={() => setError(ErrorMessage.Empty)}
      />
    </div>
  );
};
