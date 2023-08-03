/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/filter';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const USER_ID = 10344;

const FETCH_ERROR = 'Failed to fetch todos from the server. '
+ 'Please check your internet connection and try again later.';

const filterActive = (
  data: Todo[],
) => data.filter((todo) => todo.completed === false);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const activeLength = useMemo(
    () => filterActive(todos).length,
    [todos],
  );

  const completedLength = useMemo(
    () => todos.length - activeLength,
    [todos],
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    getTodos(USER_ID)
      .then((todosFromApi) => {
        setTodos(todosFromApi);
        setLoading(true);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage(FETCH_ERROR);
        timeoutId = setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setLoading(false));

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (filterType === FilterType.Active) {
      setFilteredTodos(filterActive(todos));
    } else if (filterType === FilterType.Completed) {
      setFilteredTodos(todos
        .filter((todo) => todo.completed));
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, filterType]);

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
            className={`todoapp__toggle-all ${activeLength > 0 ? 'active' : ''}`}
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && !loading
        && (
          <>
            <TodoList filteredTodos={filteredTodos} />

            <Footer
              filterType={filterType}
              setFilterType={setFilterType}
              itemsAmount={activeLength}
              completedLength={completedLength}
            />
          </>
        )}
      </div>

      {errorMessage
      && (
        <div
          className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
