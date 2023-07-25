import React, { useEffect, useMemo, useState } from 'react';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { getTodos } from './api/todos';
import { FilterOption } from './types/FilterOption';

const USER_ID = 11083;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);
  const [filterOption, setFilterOption] = useState<FilterOption>(
    FilterOption.ALL,
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 3000);
      });
  }, []);

  useMemo(() => {
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

  const isClearBtn = activeTodos.length !== currentTodos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          removeError={() => setError(false)}
          isTodos={!!todos.length}
          activeTodos={activeTodos}
        />
        {!!todos.length && (
          <>
            <TodoList todos={currentTodos} />
            <Footer
              activeTodos={activeTodos}
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              isClearBtn={isClearBtn}
            />
          </>
        )}
      </div>

      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage
        removeError={() => setError(false)}
        error={error}
      />
    </div>
  );
};
