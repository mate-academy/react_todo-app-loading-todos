import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Errors } from './components/Errors';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currError, setCurrError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<Status>(Status.All);

  const getTodosFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      const todosFromServer = await getTodos(user?.id || 0);

      setTodos(todosFromServer);
    } catch (_) {
      setHasError(true);
      setCurrError('Something went wrong :(. We can not load user`s todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />
        {!isLoading
          ? (
            <>
              <TodoList todos={todos} status={status} />
              <Footer
                status={status}
                onChangeStatus={setStatus}
                activeTodos={activeTodos}
              />
            </>
          )
          : <Loader />}
      </div>

      <Errors
        currError={currError}
        setCurrError={setCurrError}
        hasError={hasError}
        setHasError={setHasError}
      />
    </div>
  );
};
