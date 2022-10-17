import React, {
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

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState(FilterValues.All);
  const [countActive, setCountActive] = useState(0);
  const [error, setError] = useState({
    isError: false,
    message: ErrorMessages.None,
  });

  const handleError = (isError: boolean, message: ErrorMessages) => {
    setError({ isError, message });

    if (message) {
      setTimeout(() => {
        setError({ isError: false, message: ErrorMessages.None });
      }, 3000);
    }
  };

  async function loadTodos() {
    try {
      const getTodos
        = await client.get<Todo[]>(`/todos?userId=${user?.id}`);

      setTodos(getTodos);
      setCountActive(
        (getTodos.filter(todo => !todo.completed)).length,
      );
    } catch (e) {
      handleError(true, ErrorMessages.ErrorLoadTodos);
    }
  }

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  const filterTodos = (value: string) => {
    const { All, Active, Completed } = FilterValues;
    const filteredTodos = [...todos];

    switch (value) {
      case Active:
        setFilterValue(Active);

        return filteredTodos.filter(todo => !todo.completed);

      case Completed:
        setFilterValue(Completed);

        return filteredTodos.filter(todo => todo.completed);
      default:
        setFilterValue(All);

        return filteredTodos;
    }
  };

  const visibleTodos = useMemo(
    () => filterTodos(filterValue),
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
            filterTodos={filterTodos}
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
