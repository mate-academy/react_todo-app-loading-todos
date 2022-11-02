import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotify } from './components/ErrorNotification/ErrorNotification';

import { ErrorMessage } from './types/ErrorMessage';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<Error>({
    status: false,
    notification: ErrorMessage.None,
  });
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const handleError = (notification: ErrorMessage) => {
    setIsError({
      status: true,
      notification,
    });

    setTimeout(() => setIsError({
      status: false,
      notification: ErrorMessage.None,
    }), 3000);
  };

  async function loadTodos() {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(() => todosFromServer);
        setVisibleTodos(() => todosFromServer);
      } catch {
        handleError(ErrorMessage.Load);
      }
    }
  }

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              todos={todos}
              setVisibleTodos={(visTodos: Todo[]) => setVisibleTodos(visTodos)}
              todosCount={visibleTodos.length}
            />
          </>
        )}
      </div>

      <ErrorNotify
        isError={isError}
        onResetError={() => setIsError({
          status: false,
          notification: ErrorMessage.None,
        })}
      />
    </div>
  );
};
