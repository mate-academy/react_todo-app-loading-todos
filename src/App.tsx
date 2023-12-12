import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { prepareTodos } from './helpers';
import { Header } from './components/Header';
import { ErrorType } from './types/ErrorType';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { AppContext } from './AppContext';

const USER_ID = 11855;

export const App: React.FC = () => {
  const [error, setError] = useState<ErrorType | null>(null);

  const {
    todos,
    setTodos,
    status,
    setStatus,
  } = useContext(AppContext);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(ErrorType.cantLoadTodos));
  }, []);

  const filterTodos = useCallback(() => {
    return prepareTodos({
      todos,
      status,
    });
  }, [todos, status]);

  const todosOnPage = useMemo(() => filterTodos(),
    [filterTodos]);

  const itemsLeft = todos.filter(todo => (
    !todo.completed
  )).length;

  const isSomeCompleted = todosOnPage.some(
    todo => todo.completed,
  );

  const isEveryCompleted = todosOnPage.every(
    todo => todo.completed,
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isEveryCompleted={isEveryCompleted}
        />

        <TodoList
          todos={todosOnPage}
        />

        {todos.length > 0 && (
          <Footer
            itemsLeft={itemsLeft}
            status={status}
            setStatus={setStatus}
            isSomeCompleted={isSomeCompleted}
          />
        )}

        {error && todos.length > 0 && (
          <ErrorNotification
            error={error}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
