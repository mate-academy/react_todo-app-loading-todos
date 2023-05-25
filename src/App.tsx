import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { FilterOption } from './types/FilterOption';
import { ErrorMessage } from './types/ErrorMessage';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Alert } from './components/Alert';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';

const USER_ID = 10527;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterOption.All);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAlert = (alertMessage: string) => {
    setErrorMessage(alertMessage);
    setHasError(true);

    setTimeout(() => {
      setHasError(false);
      setErrorMessage('');
    }, 3000);
  };

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      handleAlert(ErrorMessage.Load);
    }
  };

  const visibleTodos: Todo[] = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter) {
        case FilterOption.Completed:
          return todo.completed;

        case FilterOption.Active:
          return !todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

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

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer todos={todos} filter={filter} setFilter={setFilter} />
          </>
        )}
      </div>

      {hasError && <Alert errorMessage={errorMessage} />}
    </div>
  );
};
