/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { FilterType } from './enum/FilterType';

const USER_ID = 10303;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoStatus, setTodoStatus] = useState<FilterType>(FilterType.All);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  let timeout: ReturnType<typeof setTimeout>;

  const showError = useCallback(() => {
    setIsErrorMessage(true);
    timeout = setTimeout(() => {
      setIsErrorMessage(false);
    }, 3000);
  }, []);

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      showError();
    }
  }, []);

  useEffect(() => {
    try {
      loadTodos();
    } catch {
      clearTimeout(timeout);
    }
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (todoStatus) {
        case FilterType.Active:
          return !completed;

        case FilterType.Completed:
          return completed;

        case FilterType.All:
        default:
          return todos;
      }
    });
  }, [todos, todoStatus]);

  const handleFilter = useCallback((filter: FilterType) => {
    setTodoStatus(filter);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        <Footer
          todos={todos}
          onStatusSelect={handleFilter}
          todoStatus={todoStatus}
        />
      </div>

      {isErrorMessage && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setIsErrorMessage(false)}
          />

          <p>Unable to load data</p>
        </div>
      )}
    </div>
  );
};
