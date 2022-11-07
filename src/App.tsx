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
import { Todo } from './types/Todo';
import { ErrorType } from './types/ErrorType';
import { FilterBy } from './types/FilterBy';
import { getVisibletodos } from './utils/getVisibleTodos';
import { NewTodoField } from './components/Auth/NewTodoField';
import { TodosList } from './components/TodosList';
import { TodosCountInfo } from './components/TodosCountInfo/TodosCountInfo';
import { TodosFilter } from './components/TodosFilter';
import { ClearCompletedTodos } from './components/ClearCompletedTodos';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [error, setError] = useState<ErrorType>(ErrorType.NONE);

  const loadTodos = async () => {
    if (user) {
      try {
        const TodosFromApi = await getTodos(user?.id);

        setTodos(TodosFromApi);
      } catch {
        throw new Error('Todos not found');
      }
    }
  };

  useEffect(() => {
    loadTodos();

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setError(ErrorType.NONE), 3000);
  }, [error]);

  useEffect(() => {
    setError(ErrorType.NONE);
  }, [filterBy]);

  const handleError = useCallback((errorType: ErrorType): void => {
    setError(errorType);
  }, []);

  const handleAddError = useCallback((
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') {
      setError(ErrorType.ADD);
    }
  }, []);

  const handleFilterChange = useCallback((filter: FilterBy): void => {
    setFilterBy(filter);
  }, []);

  const closeErrorMassege = useCallback((): void => {
    setError(ErrorType.NONE);
  }, []);

  const hasTodos = useMemo(() => todos.length > 0, [todos]);
  const hasCompleted = useMemo(() => (
    todos.some(({ completed }) => completed)), [todos]);

  const visibleTodos = useMemo(() => (
    getVisibletodos(todos, filterBy)), [todos, filterBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoField
          onAddError={handleAddError}
          onError={handleError}
          newTodoField={newTodoField}
          hasTodos={hasTodos}
        />

        {hasTodos && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              <TodosList todos={visibleTodos} onError={handleError} />
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <TodosCountInfo todos={todos} />

              <TodosFilter
                filterBy={filterBy}
                onFilterChange={handleFilterChange}
              />

              <ClearCompletedTodos
                hasCompleted={hasCompleted}
                onError={handleError}
              />
            </footer>
          </>
        )}
      </div>

      <ErrorNotification error={error} onClose={closeErrorMassege} />
    </div>
  );
};
