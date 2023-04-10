/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useState,
  useEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { Hearts } from 'react-loader-spinner';

import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { FilterType } from './types/FilterType';
import { getActiveTodos, getFilteredTodos } from './helpers/helpers';
import { ErrorMessage } from './components/ErrorMessage';

const USER_ID = 6928;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  const showError = (errorName: string) => {
    setErrorMessage(errorName);
    setHasError(true);

    setTimeout(() => {
      setHasError(false);
    }, 3000);
  };

  const handleClosingError = () => {
    setHasError(false);
  };

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filterType);
  }, [todos, filterType]);

  const activeTodos = useMemo(() => {
    return getActiveTodos(visibleTodos);
  }, [visibleTodos]);

  const hasActiveTodos = visibleTodos
    .some(({ completed }) => !completed);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch {
        showError('Unable to load todos');
      }

      setIsLoading(false);
    };

    loadData();
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
            className={classNames(
              'todoapp__toggle-all',
              { active: hasActiveTodos },
            )}
          />

          <TodoForm />
        </header>

        {isLoading && (
          <Hearts
            height="80"
            width="80"
            color="#f3e0e0"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible
          />
        )}

        <TodoList
          todos={visibleTodos}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos} items left`}
            </span>

            <TodoFilter
              filterType={filterType}
              onFilterChange={setFilterType}
            />

            {hasActiveTodos
            && filterType !== FilterType.Active && (
              <button
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        hasError={hasError}
        onClose={handleClosingError}
      />
    </div>
  );
};
