import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { List } from './components/List/List';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { getTodos } from './api/todos';
import { FilterOption } from './types/FilterOption';

const USER_ID = 11083;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);
  const [filterOption, setFilterOption] = useState<FilterOption>(FilterOption
    .ALL);
  const [error, setError] = useState(false);

  const timeout = () => setTimeout(() => {
    setError(false);
    clearTimeout(timeout());
  }, 3000);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError(true);
        timeout();
      });
  }, []);

  useEffect(() => {
    switch (filterOption) {
      case FilterOption.ACTIVE:
        setCurrentTodos(todos.filter(todo => !todo.completed));
        break;
      case FilterOption.COMPLETED:
        setCurrentTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setCurrentTodos(todos);
        break;
    }
  }, [filterOption, todos]);

  const activeTodos = todos.filter(todo => !todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isTodos={!!todos.length}
          activeTodos={activeTodos}
        />
        {!!todos.length && (
          <>
            <List todos={currentTodos} />
            <Footer
              activeTodos={activeTodos}
              filterOption={filterOption}
              setFilterOption={setFilterOption}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && <ErrorMessage />}

    </div>
  );
};
