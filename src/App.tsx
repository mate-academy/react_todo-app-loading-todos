import React, {
  useContext,
  useEffect,
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

  async function loadTodos() {
    setErrorTodo(null);

    if (user) {
      const loadedTodos = await getTodos(user.id);

      try {
        if ('Error' in loadedTodos) {
          throw new Error();
        }

        setTodosFromServer(loadedTodos);
      } catch {
        setErrorTodo('download');
        setTimeout(setErrorTodo, 3000, null);
      }
    }
  }

  const numberOfCompletedTodo
    = todosFromServer?.filter(todo => !todo.completed).length;

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
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

          {todosFromServer?.length !== 0 && todosFromServer && (
            <Footer numberOfCompletedTodo={numberOfCompletedTodo} />
          )}
        </div>

        {errorTodo && (
          <ErrorMessage
            typeError={errorTodo}
            onCloseErrorMessage={setErrorTodo}
          />
        )}
      </div>
    </NavProvider>
  );
};
