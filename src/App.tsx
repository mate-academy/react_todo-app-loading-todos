/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Errors } from './types/Errors';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodosCounter } from './components/TodosCounter';
import { ClearCompleted } from './components/ClearCompleted';

const USER_ID = 12146;

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);

  const hasCompletedTodos
    = todos?.some(({ completed }) => completed === true);

  useEffect(() => {
    setErrorMessage(null);
  }, [filter]);

  function loadPosts() {
    setLoading(true);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Errors.UnableToLoadTodos))
      .finally(() => setLoading(false));
  }

  useEffect(loadPosts, []);

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

        {!loading
          && !errorMessage
          && todos
          && <TodoList todos={todos} filter={filter} />}

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0
          && (
            <footer className="todoapp__footer" data-cy="Footer">
              <TodosCounter todos={todos} />

              {/* Active filter should have a 'selected' class */}
              <TodoFilter filter={filter} setFilter={setFilter} />

              {/* don't show this button if there are no completed todos */}
              <ClearCompleted hasCompletedTodos={hasCompletedTodos} />
            </footer>
          )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification error={errorMessage} setError={setErrorMessage} />
    </div>
  );
};
