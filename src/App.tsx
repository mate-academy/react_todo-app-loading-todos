/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// Types
import { Todo } from './types/Todo';
import { FilterOption } from './types/FilterOption';
// Functions
import { getTodos } from './api/todos';
// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Alert } from './components/Alert';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';

const USER_ID = 10527;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterOption.ALL);
  const [hasError, setHasError] = useState(false);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setHasError(true);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  const visibleTodos = todos.filter((todo) => {
    switch (filter) {
      case FilterOption.ALL:
        return true;

      case FilterOption.COMPLETED:
        return todo.completed;

      case FilterOption.ACTIVE:
        return !todo.completed;

      default:
        return true;
    }
  });

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {/* Hides the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      {/* Shows Alert if there are errors */}
      {hasError && <Alert />}
    </div>
  );
};
