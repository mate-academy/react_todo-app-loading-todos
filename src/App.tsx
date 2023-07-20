/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Notification } from './components/Notification/Notification';
import { TodoList } from './components/TodoList/TodoList';
import { Error, Filter, Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { filterTodos } from './utils/helpers';

const USER_ID = 11096;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [hasError, setHasError] = useState(Error.Not);

  useEffect(() => {
    getTodos(USER_ID).then(data => {
      setTodos(data);
    });
  }, [filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          userId={USER_ID}
          todos={todos}
          setTodos={setTodos}
          filter={filter}
          setHasError={setHasError}
        />

        {!!todos.length && (
          <TodoList
            todos={filterTodos(filter, todos)}
            setTodos={setTodos}
            setHasError={setHasError}
          />
        )}

        {!!todos.length && (
          <Footer
            setFilter={setFilter}
            filter={filter}
            todos={todos}
            setTodos={setTodos}
            setHasError={setHasError}
          />
        )}
      </div>

      <Notification
        hasError={hasError}
        setHasError={setHasError}
      />
    </div>
  );
};
