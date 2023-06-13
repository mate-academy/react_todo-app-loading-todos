import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { TodoStatusFilter } from './types/TodoStatusFilter';
import { getTodos } from './api/todos';

const USER_ID = 10684;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState(TodoStatusFilter.All);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      })
      .catch((errorFromServer) => {
        setError(errorFromServer.message);
      });
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (error) {
      timerId = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => clearTimeout(timerId);
  }, [error]);

  const closeErrorNotification = useCallback(() => {
    setError(null);
  }, []);

  const changeStatusFilter = useCallback((status: TodoStatusFilter) => {
    setStatusFilter(status);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      let status: boolean;

      switch (statusFilter) {
        case TodoStatusFilter.Active:
          status = !todo.completed;
          break;

        case TodoStatusFilter.Completed:
          status = todo.completed;
          break;

        default:
          status = true;
      }

      return status;
    });
  }, [todos, statusFilter]);

  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.completed);
  }, [todos, statusFilter]);

  const activeTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed);
  }, [todos, statusFilter]);

  const activeTodosLeft = activeTodos.length;

  const isTodosVisible = todos.length > 0;
  const isClearCompletedVisible = completedTodos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {isTodosVisible && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFooter
              statusFilter={statusFilter}
              changeStatusFilter={changeStatusFilter}
              activeTodosLeft={activeTodosLeft}
              isVisible={isClearCompletedVisible}
            />
          </>
        )}
      </div>

      {error && (
        <ErrorNotification
          error={error}
          onClose={closeErrorNotification}
        />
      )}
    </div>
  );
};
