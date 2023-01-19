/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { getVisibleTodos } from './helper';
import { Filter } from './types/filter';
import { NewTodo } from './components/NewTodo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [error, setError] = useState(false);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleFilter = useCallback((str: Filter) => setFilter(str), []);
  const handleError = () => {
    setError(true);

    setTimeout(() => setError(false), 3000);
  };

  const visibleTodos = useMemo(() => (
    filter === Filter.all
      ? todos
      : getVisibleTodos(todos, filter)
  ), [filter, todos]);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    async function getTodosFromServer() {
      if (user) {
        try {
          const todosFromServer = await getTodos(user?.id);

          setTodos(todosFromServer);
        } catch (e) {
          handleError();
        }
      }
    }

    getTodosFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <NewTodo newTodoField={newTodoField} />
        </header>

        {!todos.length || (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              length={todos.length}
              onFilter={handleFilter}
              filter={filter}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn('notification is-danger is-light has-text-weight-normal',
          { hidden: !error })}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(false)}
        />

        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
