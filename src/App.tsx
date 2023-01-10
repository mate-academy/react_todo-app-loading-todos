import classNames from 'classnames';
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

enum ErrorTypes {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [isErrorShow, setIsErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hideError = () => {
    setIsErrorShow(false);
  };

  const loadingTodos = async () => {
    if (user) {
      try {
        setIsErrorShow(false);

        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch (error) {
        if (error instanceof Error) {
          switch (error.message) {
            case ErrorTypes.Get:
              setErrorMessage('Unable to fetch data');
              break;

            case ErrorTypes.Post:
              setErrorMessage('Unable to add a todo');
              break;

            case ErrorTypes.Patch:
              setErrorMessage('Unable to update a todo');
              break;

            case ErrorTypes.Delete:
              setErrorMessage('Unable to delete a todo');
              break;

            default:
              return;
          }
        }

        setIsErrorShow(true);
        setTodos([]);

        setTimeout(() => {
          hideError();
        }, 3000);
      }
    }
  };

  const showFilteredTodos = (array: Todo[]) => {
    setCurrentTodos(array);
  };

  useEffect(() => {
    loadingTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={currentTodos} />

            <Footer todos={todos} showFilteredTodos={showFilteredTodos} />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification', 'is-danger', 'is-light', 'has-text-weight-normal',
          { hidden: !isErrorShow },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          aria-label="HideErrorButton"
          onClick={() => {
            setIsErrorShow(false);
          }}
        />

        {errorMessage}
      </div>
    </div>
  );
};
