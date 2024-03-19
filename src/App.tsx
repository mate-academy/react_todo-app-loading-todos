/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getCount, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/todoList';
import { Footer } from './components/footer';
import { ErrorNotifications } from './components/errorNotifications';

export const App: React.FC = () => {
  const [preparedTodos, setPreparedTodos] = useState<Todo[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        switch (selectedFilter) {
          case 'Active':
            setPreparedTodos(todosFromServer.filter(todo => !todo.completed));
            break;
          case 'Completed':
            setPreparedTodos(todosFromServer.filter(todo => todo.completed));
            break;
          default:
            setPreparedTodos(todosFromServer);
        }
      })
      .catch(() => setErrorMessage('Unable to load todos'));
  }, [selectedFilter]);

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

        {preparedTodos && preparedTodos.length > 0 && (
          <>
            <TodoList todos={preparedTodos} />
            <Footer
              selectedFilter={selectedFilter}
              onSelect={(a: string) => setSelectedFilter(a)}
              count={getCount(preparedTodos)}
            />
          </>
        )}
      </div>

      <ErrorNotifications
        message={errorMessage}
        onClose={(a: string) => setErrorMessage(a)}
      />
    </div>
  );
};
