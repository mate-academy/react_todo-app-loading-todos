/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useState,
} from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Error } from './types/Error';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';

import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { TodoError } from './components/TodoError';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [userTodos, setUserTodos] = useState<Todo[]>([]);
  const [hasTodos, setHasTodos] = useState(false);
  const [hasError, setHasError] = useState<Error>({ status: false });

  const handleLoadTodos = async () => {
    try {
      setHasError({ status: false });

      const todosFromServer = await getTodos((user as User).id);

      setUserTodos(todosFromServer);
    } catch {
      setHasError({ status: true });
      setTimeout(() => {
        setHasError({ status: false });
      }, 3000);
    }
  };

  useEffect(() => {
    handleLoadTodos();
  }, []);

  useEffect(() => {
    if (userTodos.length !== 0) {
      setHasTodos(true);
    } else {
      setHasTodos(false);
    }
  }, [userTodos]);

  const handleCloseError = () => {
    setHasError({ status: false });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <NewTodo hasTodos={hasTodos} />
        </header>

        {hasTodos && (
          <TodoList todos={userTodos} />
        )}

        {hasError.status && (
          <TodoError
            message={hasError.message}
            onCloseError={handleCloseError}
          />
        )}
      </div>
    </div>
  );
};
