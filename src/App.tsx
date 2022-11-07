/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodosHeader } from './components/TodosHeader';
import { TodosFooter } from './components/TodosFooter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);

  const getTodosFromServer = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (err) {
      setHasError(true);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  const handleErrorClose = () => setHasError(false);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={todos} />

            <TodosFooter todosLength={todos.length} />
          </>
        )}
      </div>

      {hasError && (
        <ErrorNotification handleErrorClose={handleErrorClose} />
      )}
    </div>
  );
};
