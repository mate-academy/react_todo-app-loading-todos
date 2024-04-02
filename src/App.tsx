/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Error } from './types/Error';
import { wait } from './utils/fetchClient';

export const App: React.FC = () => {
  const [filter, setFilter] = useState(Filter.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const titleField = useRef<HTMLInputElement>(null);
  const completed = todos.filter((todo: Todo) => todo.completed);
  const active = todos.filter((todo: Todo) => !todo.completed);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => {
        wait(1000);
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessage(Error.UnableToLoadAll);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (titleField.current) {
      return titleField.current.focus();
    }
  }, []);

  useEffect(() => {
    let timeoutId = 0;

    if (errorMessage) {
      timeoutId = window.setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filterTodos = useCallback(
    (currentTodos: Todo[], currentFilter: Filter) => {
      if (currentFilter === Filter.Active) {
        return currentTodos.filter((todo: Todo) => !todo.completed);
      } else if (currentFilter === Filter.Completed) {
        return currentTodos.filter((todo: Todo) => todo.completed);
      } else {
        return currentTodos;
      }
    },
    [],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filter);
  }, [filterTodos, filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all ', {
              active: todos.every((todo: Todo) => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />
          <form>
            <input
              ref={titleField}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!loading && <TodoList todos={filteredTodos} loading={loading} />}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {active.length} items left
            </span>

            <TodosFilter filter={filter} onFilterChange={handleFilterChange} />
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completed.length === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
