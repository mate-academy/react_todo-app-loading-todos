import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { HeaderTodoApp } from './components/HeaderTodoApp';
import { MainTodoApp } from './components/MainTodoApp';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FooterTodoApp } from './components/FooterTodoApp';
import { Filters } from './types/Filters';
import { ErrorComponent } from './components/ErrorComponent';

const USER_ID = 10299;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [category, setCategory] = useState<Filters>(Filters.All);
  const [error, setError] = useState('');

  const loadTodos = useCallback(async () => {
    const todosFromServer = await getTodos(USER_ID);

    setTodos(todosFromServer);
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => todos.filter(({ completed }) => {
    switch (category) {
      case Filters.completed:
        return completed === true;
      case Filters.Active:
        return completed === false;
      default:
        return true;
    }
  }), [todos, category]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodoApp
          todos={todos}
          USER_ID={USER_ID}
          setError={setError}
        />

        <MainTodoApp
          todos={visibleTodos}
        />

        {todos.length > 0 && (
          <FooterTodoApp
            todos={todos}
            category={category}
            onChange={setCategory}
          />
        )}
      </div>

      {error && (
        <ErrorComponent error={error} onChangeError={setError} />
      )}
    </div>
  );
};
