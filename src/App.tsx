import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';

import { ErrorMessage } from './types/ErrorMessage';
import { Todo } from './types/Todo';

import { AddField } from './components/AddFiled/AddField';
import { Filter } from './components/Filter/Filter';
import { Errors } from './components/Errors/Errors';
import { Status } from './types/Status';
import { Todos } from './components/Todos/Todos';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.None);
  const [status, setStatus] = useState<Status>(Status.All);
  const [isTodosAvailable, setIsTodosAvailable] = useState(false);

  const loadTodos = useCallback(
    async () => {
      if (!user) {
        return;
      }

      try {
        setError(ErrorMessage.None);
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
        setIsTodosAvailable(true);
      } catch {
        setError(ErrorMessage.NoTodos);
      }
    },
    [],
  );

  useEffect(() => {
    loadTodos();
  }, [user]);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        case Status.All:
        default:
          return todo;
      }
    })
  ), [todos, status]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AddField isTodosAvailable={isTodosAvailable} />

        {isTodosAvailable && (
          <>
            <Todos todos={visibleTodos} />
            <Filter
              todosQuantity={visibleTodos.length}
              status={status}
              onStatusChange={setStatus}
            />
          </>
        )}

        {error !== ErrorMessage.None && (
          <Errors
            onErrorsChange={setError}
            visibleError={error}
          />
        )}
      </div>
    </div>
  );
};
