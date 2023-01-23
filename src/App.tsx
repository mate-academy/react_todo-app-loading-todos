/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);
  const [error, setError] = useState('');
  const activeTodosQuantity = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const isAnyTodoCompleted = useMemo(() => (
    todos.some(todo => todo.completed)
  ), [todos]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  if (user) {
    getTodos(user.id)
      .then(setTodos)
      .catch(() => setError('Something went wrong'));
  }

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterStatus) {
        case FilterStatus.Active:
          return !todo.completed;

        case FilterStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, filterStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              filterStatus={filterStatus}
              isAnyTodoCompleted={isAnyTodoCompleted}
              activeTodosQuantity={activeTodosQuantity}
              onFilterStatusChange={setFilterStatus}
            />
          </>
        )}

      </div>

      <ErrorNotification error={error} onClosingErrorMessage={setError} />
    </div>
  );
};
