/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { Status } from './enum/Status';

const USER_ID = 10303;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoStatus, setTodoStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState(false);

  const showError = useCallback(() => {
    setErrorMessage(true);
    window.setTimeout(() => {
      setErrorMessage(false);
    }, 3000);
  }, []);

  useEffect(() => {
    try {
      getTodos(USER_ID).then((data) => {
        setTodos(data);
      });
    } catch {
      showError();
    }
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (todoStatus) {
        case Status.Active:
          return !completed;

        case Status.Completed:
          return completed;

        case Status.All:
        default:
          return todos;
      }
    });
  }, [todos, todoStatus]);

  const handleStatus = useCallback((status: Status) => {
    setTodoStatus(status);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        <Footer
          todos={todos}
          onStatusSelect={handleStatus}
          todoStatus={todoStatus}
        />
      </div>

      {errorMessage && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage(false)}
          />

          <p>Unable to load data</p>
        </div>
      )}
    </div>
  );
};
