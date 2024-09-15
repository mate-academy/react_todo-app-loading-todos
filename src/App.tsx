import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { filterTodos } from './utils/helpers';
import { ErrorTypes } from './types/ErrorTypes';
import { ErrorNotification } from './Components/ErrorNotification';
import { Footer } from './Components/Footer';
import { TodoList } from './Components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(ErrorTypes.OneMessage);
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, []);

  const dismissError = () => {
    setError('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = filterTodos(todos, filterType);

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

        <TodoList filteredTodos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            filterType={filterType}
            todos={todos}
            setFilterType={setFilterType}
          />
        )}
      </div>

      <ErrorNotification error={error} onDismiss={dismissError} />
    </div>
  );
};
