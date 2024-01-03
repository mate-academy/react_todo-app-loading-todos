import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { Status } from './types/Status';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 12130;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(Status.all);
  // const [visibleTodos, setVisibleTodos] = useState(todos);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);

  const onAllClick = useCallback(() => {
    if (filterBy !== Status.all) {
      setFilterBy(Status.all);
    }
  }, [filterBy]);

  const onActiveClick = useCallback(() => {
    if (filterBy !== Status.active) {
      setFilterBy(Status.active);
    }
  }, [filterBy]);

  const onCompletedClick = useCallback(() => {
    if (filterBy !== Status.completed) {
      setFilterBy(Status.completed);
    }
  }, [filterBy]);

  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case Status.all:
        return todos;

      case Status.active:
        return todos.filter(todo => !todo.completed);

      case Status.completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filterBy, todos]);

  const hideError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  useEffect(() => {
    hideError();

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(Errors.loadError);
      });
  }, [hideError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {!!todos.length && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              todos={todos}
              filterBy={filterBy}
              onAllClick={onAllClick}
              onActiveClick={onActiveClick}
              onCompletedClick={onCompletedClick}
            />
          </>
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} hideError={hideError} />
    </div>
  );
};
