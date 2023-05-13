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
  const [todoStatus, setTodoStatus] = useState<string>(Status.All);
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (message: string) => {
    setErrorMessage(message);
    window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    try {
      getTodos(USER_ID).then((data) => {
        setTodos(data);
      });
    } catch {
      showError('Error');
    }
  }, []);

  const filterTodos = useCallback(() => {
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

  const visibleTodos = useMemo(filterTodos, [todos, todoStatus]);

  const handleStatus = useCallback((status: string) => {
    setTodoStatus(status);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        <Footer
          onStatusSelect={handleStatus}
          todoStatus={todoStatus}
        />
      </div>

      {errorMessage && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />

          <p>Unable to load data</p>
        </div>
      )}
    </div>
  );
};
