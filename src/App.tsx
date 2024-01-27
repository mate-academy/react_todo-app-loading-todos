/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import { getTodos } from './api/todos';
import { ShowState } from './types/ShowState';
import { ErrorTypes } from './types/ErrorTypes';
import { Error } from './components/Error';
import { Loader } from './components/Loader';

const USER_ID = 12177;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [showState, setShowState] = useState<ShowState>(ShowState.All);
  const [error, setError] = useState<ErrorTypes | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredTodos = useMemo(() => {
    switch (showState) {
      case ShowState.All:
        return todos;
      case ShowState.Active:
        return todos.filter(toddo => !toddo.completed);
      case ShowState.Completed:
        return todos.filter(toddo => toddo.completed);
      default:
        return todos;
    }
  }, [showState, todos]);

  const loadAllTodos = async () => {
    setLoading(true);
    try {
      const allTodos = await getTodos(USER_ID);

      return allTodos;
    } catch (err) {
      setError(ErrorTypes.LOAD_ALL_TODOS);
      setTimeout(() => {
        setError(null);
      }, 3000);

      return undefined;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(null);

    (async () => {
      const todosData = await loadAllTodos();

      if (todosData) {
        setTodos(todosData);
      }
    })();
  }, []);

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

        {filteredTodos.length > 0 && <TodoList todos={filteredTodos} />}
        {loading && <Loader />}
        {todos.length > 0 && (
          <Footer
            todos={filteredTodos}
            setTodos={setTodos}
            showState={showState}
            setShowState={setShowState}
          />
        )}
        {error && <Error error={error} setError={setError} />}
      </div>
    </div>
  );
};
