/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Error } from './types/Error';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoError } from './components/TodoError/TodoError';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasTodos, setHasTodos] = useState(false);
  const [error, setError] = useState<Error>({ status: false });

  const handleLoadingTodos = async () => {
    try {
      setError({ status: false });

      const todosFromServer = await getTodos((user as User).id);

      setTodos(todosFromServer);
    } catch {
      setError({ status: true });
      setTimeout(() => {
        setError({ status: false });
      }, 3000);
    }
  };

  useEffect(() => {
    handleLoadingTodos();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      setHasTodos(true);
    } else {
      setHasTodos(false);
    }
  }, [todos]);

  const handlerToCloseError = () => {
    setError({ status: false });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <NewTodo hasTodos={hasTodos} />
        </header>

        {hasTodos && (
          <TodoList todos={todos} />
        )}

        {error.status && (
          <TodoError
            errorText={error.errorText}
            closingError={handlerToCloseError}
          />
        )}
      </div>
    </div>
  );
};
