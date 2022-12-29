/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { User } from './types/User';
import { FilterType } from './types/filterType';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { Errors } from './types/Errors';

export const App: React.FC = () => {
  const user = useContext<User | null>(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);

  const closeNotification = useCallback(() => setError(false), []);

  const filteredStatus = useMemo(() => (
    todos.filter(todo => {
      switch (filterBy) {
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        default:
          return todo;
      }
    })
  ), [todos, filterBy]);

  const fetchTodos = async () => {
    setError(false);

    try {
      if (user) {
        const loadedTodos = await getTodos(user?.id);

        setTodos(loadedTodos);
      }
    } catch {
      setError(true);
      throw new Error(Errors.Loading);
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    fetchTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!todos && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
            />
          )}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!todos && (
          <>
            <TodoList filteredStatus={filteredStatus} />
            <Footer
              todos={todos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          </>
        )}

        {error && (
          <ErrorNotification
            error={error}
            setError={setError}
            closeNotification={closeNotification}
          />
        )}
      </div>
    </div>
  );
};
