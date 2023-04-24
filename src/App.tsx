/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorType } from './types/ErrorType';
import { FilterBy } from './types/FilterBy';

const USER_ID = 9937;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(ErrorType.None);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        setErrorMessage(ErrorType.None);
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        setErrorMessage(ErrorType.Load);
      }
    };

    getTodosFromServer();
  }, []);

  const allTodosCount = todos.length;

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  useEffect(() => {
    const filteredTodos = (() => {
      switch (filterBy) {
        case FilterBy.All:
          return todos;
        case FilterBy.Active:
          return todos.filter(todo => !todo.completed);
        case FilterBy.Completed:
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [filterBy, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!allTodosCount && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              allTodosCount={allTodosCount}
              activeTodosCount={activeTodosCount}
              filterBy={filterBy}
              onFilterTodos={(status: FilterBy) => setFilterBy(status)}
            />
          </>
        )}
      </div>

      {!!errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          onCloseError={() => setErrorMessage(ErrorType.None)}
        />
      )}
    </div>
  );
};
