/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './Components/TodoList';
import { getTodos } from './api/todos';
import { FilterOption } from './enums/FilterOptions';
import { Footer } from './Components/Footer';
import { TodoNotification } from './Components/TodoNotification';
import { Header } from './Components/Header';

const USER_ID = 10898;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState(FilterOption.All);
  const [error, setError] = useState<string | null>(null);

  const visibleTodos = todos.filter((todo) => {
    switch (filterOption) {
      case FilterOption.Active:
        return !todo.completed;
      case FilterOption.Completed:
        return todo.completed;
      default:
        return FilterOption.All;
    }
  });

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer) => {
        setError(null);
        setTodos(todosFromServer);
      })
      .catch(() => {
        setError('Unable to upload todos');
      });
  }, []);

  useEffect(() => {
    let errorTimer: number;

    if (error) {
      errorTimer = window.setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(errorTimer);
    };
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {visibleTodos.length > 0 && (
          <TodoList todos={visibleTodos} />
        )}

        {todos.length > 0 && (
          <Footer
            todos={visibleTodos}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />
        )}
      </div>

      <TodoNotification
        error={error}
        setError={setError}
      />
    </div>
  );
};
