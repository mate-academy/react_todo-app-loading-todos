import React, {
  useCallback,
  useEffect,
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
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);

  const onAllclick = useCallback(() => {
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

  useEffect(() => {
    switch (filterBy) {
      case Status.all:
        setVisibleTodos(todos);
        break;

      case Status.active:
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;

      case Status.completed:
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setVisibleTodos(todos);
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
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              todos={todos}
              filterBy={filterBy}
              onAllclick={onAllclick}
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
