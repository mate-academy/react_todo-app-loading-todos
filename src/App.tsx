import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorType } from './types/ErrorTypes';
import { Filter } from './types/Filter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        setIsError(ErrorType.LOAD_TODOS);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (isError) {
      timerRef.current = setTimeout(() => {
        setIsError(null);
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleSetFilter = useCallback((newFilter: Filter) => {
    setFilter(newFilter);
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleSetIsError = useCallback((error: string | null) => {
    setIsError(error);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />
        {todos.length > 0 && (
          <Footer
            activeTodosCount={activeTodosCount}
            filter={filter}
            onFilterChange={handleSetFilter}
          />
        )}
      </div>
      <ErrorNotification isError={isError} onSetError={handleSetIsError} />
    </div>
  );
};
