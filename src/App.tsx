/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useMemo,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { FilterBy } from './types/FilterBy';
import { warningTimer } from './utils/warningTimer';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { ErrorMessages } from './types/ErrorMessages';

const USER_ID = 6316;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [hasError, setHasError] = useState(false);
  const [
    errorMessage,
    setErrorMessage,
  ] = useState<ErrorMessages>(ErrorMessages.NOUN);

  const countActiveTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );
  const hasCompletedTodos = useMemo(
    () => todos.some(todo => todo.completed),
    [todos],
  );

  const showErrorMessage = useCallback((message: ErrorMessages) => {
    setHasError(true);
    setErrorMessage(message);
  }, []);

  useEffect(() => {
    const onLoadGetTodos = async () => {
      try {
        const todosData = await getTodos(USER_ID);

        setTodos(todosData);
      } catch (error) {
        showErrorMessage(ErrorMessages.ONLOAD);
      }
    };

    onLoadGetTodos();
  }, []);

  useEffect(() => {
    if (hasError) {
      warningTimer(setHasError, false, 3000);
    }
  }, [hasError]);

  const visibleTodos = useMemo(() => (
    getFilteredTodos(todos, filterBy)
  ), [todos, filterBy]);

  const handleHasError = (isError: boolean) => {
    setHasError(isError);
  };

  const handleFilterBy = (filterType: FilterBy) => {
    setFilterBy(filterType);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header someActiveTodos={countActiveTodos} />

        <TodoList visibleTodos={visibleTodos} />

        {!!todos.length && (
          <Footer
            quantity={countActiveTodos}
            filterBy={filterBy}
            onFilterBy={handleFilterBy}
            hasCompletedTodos={hasCompletedTodos}
          />
        )}
      </div>

      <Notification
        hasError={hasError}
        errorMessage={errorMessage}
        onHasError={handleHasError}
      />
    </div>
  );
};
