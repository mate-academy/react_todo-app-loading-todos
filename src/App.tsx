import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodosSelection } from './components/TodosSelection/TodosSelection';

import { Todo } from './types/Todo';
import { TodosStatus } from './types/TodosStatus';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosStatus, setTodosStatus] = useState<TodosStatus>(TodosStatus.All);
  const [hasError, setHasError] = useState(false);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      switch (todosStatus) {
        case TodosStatus.Active:
          return !todo.completed;

        case TodosStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    })
  ), [todos, todosStatus]);

  const uncompletedTodosCount = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const getTodosFromServer = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  const closeErrorNotification = useCallback(() => (
    setHasError(false)
  ), []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  useEffect(() => {
    setTimeout(() => setHasError(false), 3000);
  }, [hasError]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList filteredTodos={filteredTodos} />

            <TodosSelection
              todosStatus={todosStatus}
              setTodosStatus={setTodosStatus}
              uncompletedTodosCount={uncompletedTodosCount}
            />
          </>
        )}
      </div>

      <ErrorNotification
        hasError={hasError}
        closeErrorNotification={closeErrorNotification}
      />
    </div>
  );
};
