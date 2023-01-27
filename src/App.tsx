/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorOccured } from './components/ErrorOccured/ErrorOccured';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredStatus, setFilteredStatus] = useState(FilterStatus.ALL);
  const [isError, setIsError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setIsError('Something went wrong...'));
    }
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filteredStatus) {
        case FilterStatus.COMPLETED: {
          return todo.completed;
        }

        case FilterStatus.ACTIVE: {
          return !todo.completed;
        }

        default:
          return todo;
      }
    });
  }, [todos, filteredStatus]);

  const activeTodoQuantity = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              activeTodoQuantity={activeTodoQuantity}
              filterType={filteredStatus}
              setFilteredStatus={setFilteredStatus}
            />
          </>
        )}
      </div>
      {isError && (
        <ErrorOccured
          error={isError}
          setIsError={setIsError}
        />
      )}
    </div>
  );
};
