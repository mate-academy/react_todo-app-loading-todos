import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const filterTodos = useMemo(() => todos.filter(todo => {
    switch (filterBy) {
      case FilterBy.All:
        return todo;
      case FilterBy.Active:
        return !todo.completed;
      case FilterBy.Completed:
        return todo.completed;
      default:
        return true;
    }
  }), [todos]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const loadTodos = async (userId: number) => {
      try {
        setTodos(await getTodos(userId));
      } catch {
        setError(true);
      }
    };

    loadTodos(user?.id || 0);
  }, []);

  const todosCompleted = useMemo(() => todos
    .filter(({ completed }) => completed), [todos]);
  const todosActive = useMemo(() => todos
    .filter(({ completed }) => !completed), [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              aria-label="label"
              className={classNames(
                'todoapp__toggle-all',
                {
                  active: todos.length === todosCompleted.length,
                },
              )}
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

        <TodoList todos={filterTodos} />

        {!!todos.length && (
          <Footer
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            todosActive={todosActive}
            todosCompleted={todosCompleted}
          />
        )}
      </div>

      <ErrorNotification
        setError={setError}
        error={error}
      />

    </div>
  );
};
