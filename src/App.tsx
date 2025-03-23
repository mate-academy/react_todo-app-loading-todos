import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
// eslint-disable-next-line
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import FilteredTodo from './types/FilteredTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<FilteredTodo>(FilteredTodo.All);

  useEffect(() => {
    const loadTodos = () => {
      setIsLoading(true);
      setErrorMessage(null);

      getTodos()
        .then(data => {
          setTodos(data);
        })
        .catch(() => {
          setErrorMessage('Unable to load todos');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filtered) {
      case FilteredTodo.Active:
        return todos.filter(td => !td.completed);
      case FilteredTodo.Completed:
        return todos.filter(td => td.completed);
      default:
        return todos;
    }
  }, [filtered, todos]);

  const uncompletedTodos = useMemo(() => {
    return todos.filter(td => !td.completed).length;
  }, [todos]);

  const changeVisibleTodos = (filterType: FilteredTodo) => {
    setFiltered(filterType);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const changeError = (error: string) => {
    setErrorMessage(error);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header changeError={changeError} />

        {!isLoading && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            changeVisibleTodos={changeVisibleTodos}
            filtered={filtered}
            uncompletedTodos={uncompletedTodos}
          />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        changeError={changeError}
      />
    </div>
  );
};
