import React, {
  useEffect, useRef, useMemo, useContext,
} from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodos(user?.id || 0)
      .then(setTodos)
      .catch(() => {
        setError(true);
        setErrorMessage('Unable to load todos');
      });
  }, [user]);

  const filteredTodos = todos.filter(({ completed }) => {
    switch (filterType) {
      case 'active':
        return !completed;

      case 'completed':
        return completed;

      default:
        return true;
    }
  });

  const activeTodosTotal = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  const isActiveTodos = activeTodosTotal === todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          isActiveTodos={isActiveTodos}
        />
        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              filterType={filterType}
              handleFilter={setFilterType}
              todos={todos}
            />
          </>
        )}
      </div>

      {error && (
        <ErrorNotification
          error={error}
          errorMessage={errorMessage}
          handleError={setError}
        />
      )}
    </div>
  );
};
