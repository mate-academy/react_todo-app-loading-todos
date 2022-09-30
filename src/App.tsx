import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { SortType } from './types/SortType';
import { Todo } from './types/Todo';
import { getActiveTodos, getCompletedTodos } from './utils/filtering';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);

  const [userTodos, setUserTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibileTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.all);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then((todos) => {
          setUserTodos(todos);
        })
        .catch(() => setHasError(true));
    }

    setTimeout(() => setHasError(false), 3000);
  }, []);

  useEffect(() => {
    switch (sortType) {
      case SortType.completed:
        setVisibileTodos(getCompletedTodos(userTodos));
        break;

      case SortType.active:
        setVisibileTodos(getActiveTodos(userTodos));
        break;

      case SortType.all:
        setVisibileTodos(userTodos);
        break;

      default: throw new Error('Unknown sort type');
    }
  }, [sortType, userTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isTodos={Boolean(userTodos.length)} />

        <TodoList todos={visibleTodos} />

        {Boolean(userTodos.length)
        && (
          <Footer
            sortType={sortType}
            onSortType={setSortType}
            activeTodosCount={getActiveTodos(userTodos).length}
          />
        )}
      </div>

      {hasError && <ErrorNotification onHasError={setHasError} />}
    </div>
  );
};
