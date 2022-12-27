/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { Errors } from './components/Errors';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getTodosFromServer = useCallback(async () => {
    try {
      setIsLoading(true);

      const todosFromServer = await getTodos(user?.id || 1);

      setTodos(todosFromServer);
    } catch (err) {
      setErrorMessage('Failed to loaded todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {!isLoading
          ? (
            <>
              <TodoList todos={todos} status={status} />
              <Footer
                status={status}
                activeTodos={activeTodos}
                setStatus={setStatus}
              />
            </>
          )
          : <Loader />}
      </div>

      <Errors currError={errorMessage} setCurrError={setErrorMessage} />
    </div>
  );
};
