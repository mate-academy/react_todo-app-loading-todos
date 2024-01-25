/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoLIst/TodoLIst';
import { Footer } from './components/Footer/Footer';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { FilterItem } from './types/FilterItem';

const USER_ID = 37;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(FilterItem.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));

    setTimeout(setErrorMessage, 3000, '');
  }, []);

  const activeTodos = todos?.filter(todo => !todo.completed);
  const completedTodos = todos?.filter(todo => todo.completed);

  function getFilterTodos() {
    switch (filter) {
      case 'active': {
        return todos?.filter(todo => !todo.completed);
      }

      case 'completed': {
        return todos?.filter(todo => todo.completed);
      }

      default:
        return todos;
    }
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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

        <TodoList todos={getFilterTodos()} />

        {todos?.length !== 0 && (
          <Footer
            activeTodos={activeTodos?.length}
            completedTodos={completedTodos?.length}
            setFilter={setFilter}
            filter={filter}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
