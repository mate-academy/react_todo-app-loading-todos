/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './types/ErrorMessage';
import { FilterBy } from './types/Filter';
import { Todo } from './types/Todo';
import { getFiltredTodos } from './utils/getFiltredTodos';

const USER_ID = 6392;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage]
    = useState<ErrorMessage>(ErrorMessage.NONE);

  const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos(USER_ID);

      setTodos(loadedTodos);
    } catch {
      setHasError(true);
      setErrorMessage(ErrorMessage.ONLOAD);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => (
    getFiltredTodos(todos, filterBy)
  ), [todos, filterBy]);

  const activeTodosAmount = todos.filter(todo => !todo.completed).length;
  const isFooterVisible = !!todos.length;
  const isClearButtonVisible = !!(todos.length - activeTodosAmount);

  const clearNotification = useCallback(() => {
    setHasError(false);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {isFooterVisible && (
          <Footer
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            activeTodosAmount={activeTodosAmount}
            isClearButtonVisible={isClearButtonVisible}
          />
        )}
      </div>

      {hasError && (
        <Notification
          hasError={hasError}
          errorMessage={errorMessage}
          onClear={clearNotification}
        />
      )}
    </div>
  );
};
