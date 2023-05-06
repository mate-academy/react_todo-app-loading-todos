/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodosList } from './components/TodosList/TodosList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/Filter';
import { Error } from './types/Error';

const USER_ID = 9936;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState(FilterType.ALL);
  const [isError, setIsError] = useState(Error.NONE);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => setIsError(Error.DOWNLOAD));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const getFilteredTodos = (option: FilterType, todosToFilter: Todo[]) => {
    switch (option) {
      case FilterType.ACTIVE:
        return todosToFilter.filter(todo => todo.completed === false);

      case FilterType.COMPLETED:
        return todosToFilter.filter(todo => todo.completed === true);

      default:
        return todosToFilter;
    }
  };

  const hasSomeTodos = todos.length > 0;
  const visibleTodos = getFilteredTodos(filterOption, todos);

  const handleError = (e: Error) => {
    setIsError(e);

    setTimeout(() => {
      setIsError(Error.NONE);
    }, 3000);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          hasSomeTodos={hasSomeTodos}
          onChangeIsError={handleError}
        />

        <TodosList
          visibleTodos={visibleTodos}
          onChangeIsError={handleError}
        />

        {hasSomeTodos && (
          <Footer
            filterOption={filterOption}
            onChangeFilterOption={setFilterOption}
          />
        )}
      </div>

      <div
        className={
          classNames(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !isError },
          )
        }
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsError(Error.NONE)}
        />
        {isError}
      </div>
    </div>
  );
};
