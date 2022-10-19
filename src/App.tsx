import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';
import { FilterValues } from './types/FilterValues';
import { Errors } from './components/Errors';
import { ErrorMessages } from './types/Error';

export function filterTodos(todos: Todo[], value: FilterValues) {
  const { Active, Completed } = FilterValues;
  const filteredTodos = [...todos];

  switch (value) {
    case Active:

      return filteredTodos.filter(todo => !todo.completed);

    case Completed:

      return filteredTodos.filter(todo => todo.completed);
    default:

      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState(FilterValues.All);
  const [error, setError] = useState({
    isError: false,
    message: ErrorMessages.None,
  });

  const handleError = useCallback(
    (isError: boolean, message: ErrorMessages) => {
      setError({ isError, message });

      if (message) {
        setTimeout(() => {
          setError({ isError: false, message: ErrorMessages.None });
        }, 3000);
      }
    }, [],
  );

  const loadTodos = useCallback(async () => {
    try {
      const getTodos
        = await client.get<Todo[]>(`/todos?userId=${user?.id}`);

      setTodos(getTodos);
    } catch (e) {
      handleError(true, ErrorMessages.ErrorLoadTodos);
    }
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  const countActive = useMemo(() => {
    return (todos.filter(todo => !todo.completed)).length;
  }, [todos]);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filterValue),
    [todos, filterValue],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          newTodoField={newTodoField}
        />

        <TodoList
          todos={visibleTodos}
        />

        {!!todos.length && (
          <Footer
            filterTodos={setFilterValue}
            countActive={countActive}
            filterValue={filterValue}
          />
        )}
      </div>

      <Errors
        error={error}
        handleError={handleError}
      />
    </div>
  );
};
