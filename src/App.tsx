/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Status } from './enum/Status';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage } from './enum/ErrorMessages';
import { Error } from './components/Error/Error';

const USER_ID = 11298;

const getFilterdTodos = (
  todos: Todo[],
  filterBy: Status,
) => {
  const filteredTodos = [...todos];

  switch (filterBy) {
    case Status.all:
      return filteredTodos;

    case Status.active:
      return filteredTodos.filter(todo => !todo.completed);

    case Status.completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<Status>(Status.all);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const setErrorWithTimeout = (type: ErrorMessage | null, time: number) => {
    setErrorMessage(type);

    setTimeout(() => {
      setErrorMessage(null);
    }, time);
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorWithTimeout(ErrorMessage.Add, 30000))
      .finally(() => setIsLoading(false));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return getFilterdTodos(todos, filterBy);
  }, [todos, filterBy]);

  const activeTodos = filteredTodos.filter(todo => !todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {activeTodos && (
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

        <TodoList todos={filteredTodos} />

        <Footer
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          todos={todos}
        />
      </div>

      {errorMessage && !isLoading && (
        <Error
          error={errorMessage}
          setError={setErrorMessage}
        />
      )}
    </div>
  );
};
