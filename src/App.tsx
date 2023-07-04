import React, { useEffect, useMemo, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterBy } from './types/FilterBy';
import { ErrorMessage } from './types/ErrorMessage';
import { filterByStatus } from './utils/helpers';

const USER_ID = 10913;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorNotification, setErrorNotification] = useState(ErrorMessage.none);
  const [filterTodos, setFilterTodos] = useState(FilterBy.all);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorNotification(ErrorMessage.onLoad);
      });
  }, []);

  if (errorNotification) {
    setTimeout(() => {
      setIsHidden(true);
      // setErrorNotification(ErrorMessage.none);
    }, 3000);
  }

  const activeTodos = filterByStatus(todos, false);
  const completedTodos = filterByStatus(todos, true);

  const visibleTodos = useMemo(() => {
    switch (filterTodos) {
      case FilterBy.all:
        return todos;

      case FilterBy.completed:
        return completedTodos;

      case FilterBy.active:
        return activeTodos;

      default:
        throw new Error('failed to filter');
    }
  }, [filterTodos, todos]);

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {visibleTodos.length > 0
          && (
            <>
              <TodoList todos={visibleTodos} />

              <Footer
                setFilterTodos={setFilterTodos}
                filterTodos={filterTodos}
                activeNumber={activeTodos.length}
                completedNumber={completedTodos.length}
              />
            </>
          )}
      </div>
      {errorNotification
        && (
          <ErrorNotification
            errorNotification={errorNotification}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
          />
        )}
    </div>
  );
};
