/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Notification } from './components/Notification';
import { Footer } from './components/Footer';
import { FilterBy } from './types/FilterBy';
import { TodoList } from './components/TodoList';
import { getFilteredTodos } from './helpers/getFilteredTodos';

const USER_ID = 10775;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.ALL);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then((loadedTodos: Todo[]) => {
        setTodos(loadedTodos);
      })
      .catch((loadedError: Error) => {
        setIsError(loadedError?.message ?? 'Error');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = getFilteredTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {(todos.length > 0) && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <TodoList todos={filteredTodos} />
        )}

        {(todos.length > 0) && (
          <Footer
            todos={todos}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {isError && <Notification />}
    </div>
  );
};
