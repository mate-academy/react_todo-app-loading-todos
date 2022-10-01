import {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { TodosList } from './components/TodosList/TodosList';

export const App: React.FC = () => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterStatus>(FilterStatus.All);
  const [error, setError] = useState('errorMessage');

  let userId = 0;

  if (user?.id) {
    userId = user.id;
  }

  useEffect(() => {
    getTodos(userId)
      .then(setTodos);
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const filterTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterStatus.All:
        return todo;
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return null;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header
          query={query}
          setQuery={setQuery}
          newTodoField={newTodoField}
          todos={todos}
        />

        <TodosList todos={filterTodos} />

        {todos.length > 0
          && (
            <Footer
              setFilterType={setFilterType}
              filterType={filterType}
              todos={todos}
            />
          )}

      </div>

      {error
        && (
          <ErrorNotification
            setError={setError}
            error={error}
          />
        )}
    </div>
  );
};
