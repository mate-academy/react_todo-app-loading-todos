/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
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

  useEffect(() => {
    getTodos(USER_ID)
      .then(fetchTodos => {
        setTodos(fetchTodos);
      })
      .catch(() => {
        setHasError(true);
        setErrorMessage(ErrorMessage.ONLOAD);
      });
  }, []);

  const visibleTodos = getFiltredTodos(todos, filterBy);

  const countActiveTodos = todos.filter(todo => !todo.completed).length;
  const isFooterVisible = !!todos.length;
  const isClearButtonVisible = !!(todos.length - countActiveTodos);

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
            countActiveTodos={countActiveTodos}
            isClearButtonVisible={isClearButtonVisible}
          />
        )}
      </div>

      <Notification
        hasError={hasError}
        errorMessage={errorMessage}
        onClear={clearNotification}
      />
    </div>
  );
};
