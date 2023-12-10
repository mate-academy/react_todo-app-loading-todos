import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { Error } from './types/Error';
import { FilterTodos } from './types/FilterTodos';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 6550;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [errorMessage, setErrorMessage] = useState(Error.NONE);
  const [filterBy, setFilterBy] = useState(FilterTodos.ALL);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        setErrorMessage(Error.NONE);
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        setErrorMessage(Error.LOAD);
      }
    };

    getTodosFromServer();
  }, []);

  const countTodos = todos.length;

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  useEffect(() => {
    const filteredTodos = (() => {
      switch (filterBy) {
        case FilterTodos.ALL:
          return todos;
        case FilterTodos.ACTIVE:
          return todos.filter(todo => !todo.completed);
        case FilterTodos.COMPLTED:
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [todos, filterBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!countTodos && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              allTodos={countTodos}
              activeTodos={activeTodos}
              filterBy={filterBy}
              onFilterTodos={(curStatus: FilterTodos) => setFilterBy(curStatus)}
            />
          </>
        )}

      </div>
      {!!errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          onCloseError={() => setErrorMessage(Error.NONE)}
        />
      )}

    </div>
  );
};
