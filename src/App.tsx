import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotifications } from './components/ErrorNotifications';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Filter } from './types/enum';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [seenTodos, setSeenTodos] = useState(todos);
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const getTodosFromServer = useCallback(async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  useEffect(() => {
    let todosToFilter = [...todos];

    if (filter !== 'All') {
      todosToFilter = todosToFilter.filter(todo => {
        switch (filter) {
          case Filter.Active:
            return !todo.completed;

          case Filter.Completed:
            return todo.completed;

          default:
            return true;
        }
      });
    }

    setSeenTodos(todosToFilter);
  }, [todos, filter]);

  const handleFilter = useCallback(
    (todosFilter: Filter) => setFilter(todosFilter), [todos],
  );

  const handleErrorClose = useCallback(() => setIsError(false), []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        <TodoList todos={seenTodos} />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            handleFilter={handleFilter}
            filter={filter}
          />
        )}
      </div>

      <ErrorNotifications
        isError={isError}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};
