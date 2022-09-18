import React, {
  useContext, useEffect, useRef, useState, useMemo, useCallback,
} from 'react';
import { getUserId } from './api/users';
import { getTodos, getFilteredTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Title } from './components/Title';
import { Content } from './components/Content/Content';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState(TodoStatus.ALL);
  const [error, setError] = useState<Error | null>(null);

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos, todoFilter)
  ), [todos, todoFilter]);

  const activeTodos = useMemo(() => (
    getFilteredTodos(todos, TodoStatus.ACTIVE)
  ), [todos]);

  const completedTodos = useMemo(() => (
    getFilteredTodos(todos, TodoStatus.COMPLETED)
  ), [todos]);

  const handleTodoFilter = useCallback((filterStatus: TodoStatus) => {
    setTodoFilter(filterStatus);
  }, [todoFilter]);

  const handleError = useCallback((errorStatus: Error | null) => {
    setError(errorStatus);
  }, [error]);

  useEffect(() => {
    const onScreenTimer = setTimeout(() => setError(null), 3000);

    return () => clearTimeout(onScreenTimer);
  }, [error]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(getUserId(user))
        .then(setTodos)
        .catch(() => {
          setError(Error.SERVER);
        });
    }
  }, []);

  return (
    <div className="todoapp">
      <Title />

      <Content
        todos={filteredTodos}
        newTodo={newTodoField}
        activeTodos={activeTodos.length}
        completedTodos={completedTodos.length}
        isTodos={todos.length > 0}
        todoFilter={todoFilter}
        onTodoFilter={handleTodoFilter}
      />

      {error && (
        <ErrorNotification
          error={error}
          onError={handleError}
        />
      )}
    </div>
  );
};
