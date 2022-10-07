import {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { FilterStatus } from './types/FilterStatus';
import { Header } from './components/NewTodo';
import { Footer } from './components/TodoFilter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    filterStatus,
    setFilterStatus,
  ] = useState<FilterStatus>(FilterStatus.All);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const loadTodos = async (userId: number) => {
      try {
        const receivedTodos = await getTodos(userId);

        setTodos(receivedTodos);
      } catch {
        setError('Unable to load a todo');
      }
    };

    if (user) {
      loadTodos(user.id);
    }
  }, [user]);

  const filteredTodos = useMemo(() => {
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
            <TodoList
              todos={filteredTodos}
            />

            <Footer
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filteredTodos={filteredTodos}
            />
          </>
        )}
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
