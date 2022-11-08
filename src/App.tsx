import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { ErrorTodo } from './types/ErrorTodo';
import { ErrorMessage } from './components/errorMessage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { NavProvider } from './components/NavContext';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>();
  const [errorTodo, setErrorTodo] = useState<ErrorTodo | null>(null);
  const timerId = useRef<number | undefined>();

  const showErrorMessage = () => {
    setErrorTodo('download');
    timerId.current = window.setTimeout(() => {
      setErrorTodo(null);
    }, 3000);
  };

  const closeErrorMessage = () => {
    setErrorTodo(null);
    clearTimeout(timerId.current);
  };

  async function loadTodos() {
    closeErrorMessage();

    if (user) {
      const loadedTodos = await getTodos(user.id);

      try {
        if ('Error' in loadedTodos) {
          throw new Error();
        }

        setTodosFromServer(loadedTodos);
      } catch {
        showErrorMessage();
      }
    }
  }

  const numberOfCompletedTodo = useMemo(
    () => todosFromServer?.filter(todo => !todo.completed).length,
    [todosFromServer],
  );

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();

    return () => {
      clearTimeout(timerId.current);
    };
  }, []);

  return (
    <NavProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header
            newTodoField={newTodoField}
            numberOfCompletedTodo={numberOfCompletedTodo}
          />

          {todosFromServer && <TodoList todos={todosFromServer} />}

          {todosFromServer?.length && (
            <Footer numberOfCompletedTodo={numberOfCompletedTodo} />
          )}
        </div>

        {errorTodo && (
          <ErrorMessage
            typeError={errorTodo}
            onCloseErrorMessage={closeErrorMessage}
          />
        )}
      </div>
    </NavProvider>
  );
};
