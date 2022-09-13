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
  const [isTodo, setIsTodo] = useState(false);
  const [todoFilter, setTodoFilter] = useState(TodoStatus.ALL);
  const [error, setError] = useState<Error>();
  const [isError, setIsError] = useState(false);

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos, todoFilter)
  ), [todos, todoFilter]);

  const activeTodos = useMemo(() => (
    getFilteredTodos(todos, TodoStatus.ACTIVE)
  ), [todos]);

  useMemo(() => (
    todos.length > 0
      ? setIsTodo(true)
      : setIsTodo(false)
  ), [todos]);

  const handleTodoFilter = useCallback((filterStatus: TodoStatus) => {
    setTodoFilter(filterStatus);
  }, [todoFilter]);

  const handleErrorChange = useCallback((errorStatus: boolean) => {
    setIsError(errorStatus);
  }, [isError]);

  useEffect(() => {
    const onScreenTimer = setTimeout(() => setIsError(false), 3000);

    return () => clearTimeout(onScreenTimer);
  }, [isError]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(getUserId(user))
        .then(setTodos)
        .catch(() => {
          setIsError(true);
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
        isTodo={isTodo}
        todoFilter={todoFilter}
        onTodoFilter={handleTodoFilter}
      />

      {error && (
        <ErrorNotification
          error={error}
          isError={isError}
          onErrorChange={handleErrorChange}
        />
      )}
    </div>
  );
};
