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
import { Filter } from './types/Filter';
import { NewTodo } from './components/NewTodo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedFilter, setCompletedFilter] = useState<Filter>(Filter.all);
  const [isError, setIsError] = useState('');

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleChangeCompletedFilter = useCallback((str: Filter) => {
    setCompletedFilter(str);
  }, []);
  const showErrorMessage = (message: string) => {
    setIsError(message);

    setTimeout(() => setIsError(''), 3000);
  };

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, completedFilter)
  ), [completedFilter, todos]);

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
          showErrorMessage('Unable to get a todo');
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

        {todos.length !== 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              todosLength={todos.length}
              onCompletedFilterChange={handleChangeCompletedFilter}
              complitedFilter={completedFilter}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn('notification is-danger is-light has-text-weight-normal',
          { hidden: !isError })}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsError('')}
        />

        {isError}
      </div>
    </div>
  );
};
