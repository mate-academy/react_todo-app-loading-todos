import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { TodoFooter } from './components/TodoFooter';
import { TodoMain } from './components/TodoMain';
import { Todo } from './types/Todo';
import { ErrorMessage, FilterStatus } from './types/ui';

const ERROR_HIDE_DELAY = 3000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | ''>('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const errorTimerId = useRef<number | null>(null);
  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  const clearErrorTimer = useCallback(() => {
    if (errorTimerId.current) {
      window.clearTimeout(errorTimerId.current);
      errorTimerId.current = null;
    }
  }, []);

  const hideError = useCallback(() => {
    clearErrorTimer();
    setIsErrorVisible(false);
  }, [clearErrorTimer]);

  const showError = useCallback(
    (message: ErrorMessage) => {
      clearErrorTimer();
      setErrorMessage(message);
      setIsErrorVisible(true);

      errorTimerId.current = window.setTimeout(() => {
        setIsErrorVisible(false);
      }, ERROR_HIDE_DELAY);
    },
    [clearErrorTimer],
  );

  useEffect(() => {
    newTodoFieldRef.current?.focus();
  }, []);

  useEffect(() => {
    hideError();

    getTodos()
      .then(setTodos)
      .catch(() => {
        showError(ErrorMessage.LoadTodos);
      });

    return () => {
      clearErrorTimer();
    };
  }, [clearErrorTimer, hideError, showError]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case FilterStatus.Active:
        return todos.filter(todo => !todo.completed);

      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.length - activeTodosCount;
  const hasTodos = todos.length > 0;

  return (
    <div className="todoapp">
      <Header
        newTodoFieldRef={newTodoFieldRef}
        hasTodos={hasTodos}
        activeTodosCount={activeTodosCount}
      />

      <div className="todoapp__content">
        <TodoMain todos={visibleTodos} hasTodos={hasTodos} />

        <TodoFooter
          hasTodos={hasTodos}
          activeTodosCount={activeTodosCount}
          completedTodosCount={completedTodosCount}
          selectedFilter={filter}
          onFilterChange={setFilter}
        />
      </div>

      <ErrorNotification
        message={errorMessage}
        isVisible={isErrorVisible}
        onClose={hideError}
      />
    </div>
  );
};
