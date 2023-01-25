/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState(StatusFilter.All);
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const loadTodos = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      setErrorMessage('');
      const loadedTodos = await getTodos(user.id);

      setTodos(loadedTodos);
    } catch (error) {
      setErrorMessage('Can not load todos');
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (statusFilter) {
        case StatusFilter.All:
          return todo;

        case StatusFilter.Active:
          return !todo.completed;

        case StatusFilter.Completed:
          return todo.completed;

        default:
          throw new Error(' No valide type ');
      }
    });
  }, [todos, statusFilter]);

  const activeTodosAmount = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const isCompletedTodos = useMemo(() => (
    todos.some(todo => todo.completed)
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
              activeTodosAmount={activeTodosAmount}
              isCompletedTodos={isCompletedTodos}
              statusFilter={statusFilter}
              onChangeStatusFilter={setStatusFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={errorMessage}
        onSetErrorMessage={setErrorMessage}
      />
    </div>
  );
};
