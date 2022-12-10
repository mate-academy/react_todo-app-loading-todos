/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const user = useContext(AuthContext);
  const activeTodosCount = todos.filter(todoItem => !todoItem.completed).length;

  const loadTodos = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await getTodos(user.id);

      setTodos(response);
    } catch {
      setError('Unable to load todos');
    }

    setIsLoaded(true);
  };

  const onCloseError = useCallback(() => {
    setError('');
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filter) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [todos, filter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList visibleTodos={visibleTodos} />

        {(isLoaded && todos.length > 0) && (
          <Footer
            activeTodosCount={activeTodosCount}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {error && <Error error={error} onCloseError={onCloseError} />}
    </div>
  );
};
