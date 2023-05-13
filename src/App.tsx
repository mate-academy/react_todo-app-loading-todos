/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useState,
  useEffect,
  useCallback,
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

  const filteredTodos = () => {
    let preparedTodos = [...todos];

    switch (todoStatus) {
      case Status.Active:
        preparedTodos = preparedTodos.filter((todo) => (!todo.completed));
        break;

      case Status.Completed:
        preparedTodos = preparedTodos.filter((todo) => (todo.completed));
        break;

      case Status.All:
      default:
        return preparedTodos;
    }

    return preparedTodos;
  };

  const visibleTodos = filteredTodos();

  const handleStatus = useCallback((status: string) => {
    setTodoStatus(status);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        <Footer
          onStatusSelect={handleStatus}
          todoStatus={todoStatus}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
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
