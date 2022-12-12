/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { FooterTodo } from './components/FooterTodo';
import { HeaderTodo } from './components/HeaderTodo';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { StatusToFilter } from './utils/StatusToFilter';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(StatusToFilter.All);
  const [loadingError, setLoadingError] = useState(false);

  const onFilterStatusChange = useCallback(setFilterStatus, []);

  const onSetLoadingError = useCallback(setLoadingError, []);

  const onErrorDetection = useCallback(() => {
    setLoadingError(true);

    setTimeout(() => setLoadingError(false), 3000);
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user?.id)
        .then(setTodos)
        .catch(onErrorDetection);
    }
  }, []);

  const getVisibleGoods = useCallback((allTodos: Todo[]) => {
    return allTodos.filter(todo => {
      switch (filterStatus) {
        case StatusToFilter.Active:
          return !todo.completed;

        case StatusToFilter.Completed:
          return todo.completed;

        case StatusToFilter.All:
        default:
          return todo;
      }
    });
  }, [todos, filterStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodo />

        <TodoList todos={getVisibleGoods(todos)} />

        {todos.length > 0 && (
          <FooterTodo
            onFilterStatusChange={onFilterStatusChange}
            filterStatus={filterStatus}
          />
        )}
      </div>

      <ErrorNotification
        loadingError={loadingError}
        onSetLoadingError={onSetLoadingError}
      />
    </div>
  );
};
