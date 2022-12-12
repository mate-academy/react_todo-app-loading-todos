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
import { FilterValues } from './types/FilterValues';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterValues>(FilterValues.ALL);
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
      setErrorMessage('Unable to load todos');
    } finally {
      setIsLoaded(true);
    }
  };

  const onCloseError = useCallback(() => {
    setErrorMessage('');
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filter) {
        case FilterValues.ACTIVE:
          return todo.completed === false;
        case FilterValues.COMPLETED:
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

      {errorMessage && (
        <Error
          error={errorMessage}
          onCloseError={onCloseError}
        />
      )}
    </div>
  );
};
