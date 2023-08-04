/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/filter';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { USER_ID, ERROR_TIMEOUT, FETCH_ERROR } from './utils/constants';

const filterActive = (
  data: Todo[],
) => data.filter((todo) => todo.completed === false);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredTodos = useMemo(() => {
    switch (filterType) {
      case FilterType.Active:
        return filterActive(todos);
      case FilterType.Completed:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterType]);

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

    setIsLoading(true);

    getTodos(USER_ID)
      .then((todosFromApi) => {
        setTodos(todosFromApi);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage(FETCH_ERROR);
        timeoutId = setTimeout(() => setErrorMessage(''), ERROR_TIMEOUT);
      })
      .finally(() => setIsLoading(false));

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${cn({ active: activeLength > 0 })}`}
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0
        && (
          <>
            <TodoList
              filteredTodos={filteredTodos}
              isLoading={isLoading}
            />

            <Footer
              filterType={filterType}
              setFilterType={setFilterType}
              itemsAmount={activeLength}
              completedLength={completedLength}
            />
          </>
        )}
      </div>

      <div
        className={`notification is-danger is-light has-text-weight-normal ${cn({ hidden: !errorMessage })}`}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
