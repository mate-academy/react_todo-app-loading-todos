import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import type { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FilterStatus, TodoFilter } from './components/TodoFilter';
import { ErrorNotification } from './components/ErrorNotification';
import { NewTodo } from './components/NewTodo';

const LOAD_ERROR_MESSAGE = 'Unable to load todos';
const ERROR_HIDE_DELAY = 3000;

function getVisibleTodos(todos: Todo[], status: FilterStatus): Todo[] {
  switch (status) {
    case FilterStatus.Active:
      return todos.filter(todo => !todo.completed);

    case FilterStatus.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(FilterStatus.All);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!USER_ID) {
      return undefined;
    }

    let isMounted = true;

    setErrorMessage('');

    getTodos()
      .then(loadedTodos => {
        if (isMounted) {
          setTodos(loadedTodos);
        }
      })
      .catch(() => {
        if (isMounted) {
          setErrorMessage(LOAD_ERROR_MESSAGE);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setErrorMessage('');
    }, ERROR_HIDE_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [errorMessage]);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, selectedStatus),
    [todos, selectedStatus],
  );

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.length - activeTodosCount;
  const allTodosCompleted = todos.length > 0 && activeTodosCount === 0;
  const counterLabel = activeTodosCount === 1 ? 'item' : 'items';

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {todos.length > 0 ? (
          <header className="todoapp__header">
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allTodosCompleted,
              })}
              data-cy="ToggleAllButton"
              aria-label="Toggle all todos"
            />

            <NewTodo />
          </header>
        ) : (
          <NewTodo />
        )}

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} ${counterLabel} left`}
            </span>

            <TodoFilter
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosCount === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
