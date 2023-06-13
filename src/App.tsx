/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterValues, filteredTodos } from './constants';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { UserWarning } from './UserWarning';

const USER_ID = 10641;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(FilterValues.ALL);

  const visibleTodos = useMemo(() => {
    return filteredTodos(todos, selectedFilter);
  }, [todos, selectedFilter]);

  const hasActive = todos.some(todoItem => !todoItem.completed);

  const getTodosFromServer = async () => {
    try {
      const response = await getTodos(USER_ID);

      setTodos(response);
    } catch (error) {
      setErrorType('upload');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasActive={hasActive} />
        {!!todos.length && (
          <>
            <TodoList
              todos={visibleTodos}
            />

            <Footer
              todos={todos}
              selectedFilter={selectedFilter}
              onChange={setSelectedFilter}
            />
          </>
        )}
      </div>
      {errorType ? (
        <ErrorNotification
          errorType={errorType}
        />
      ) : null}
    </div>
  );
};
