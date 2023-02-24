/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorMessage } from './components/ErrorMessage';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { Filter } from './enum/Filter';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { filteredTodos } from './utils/filter';
import { Error } from './enum/Errors';

const USER_ID = 6387;

export const App: React.FC = () => {
  const [isError, setIsError] = useState(Error.RESET);
  const [filter, setFilter] = useState(Filter.ALL);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(result => setTodos(result))
      .catch(() => setIsError(Error.DATA));
  }, []);

  if (isError) {
    window.setTimeout(() => setIsError(Error.RESET), 3000);
  }

  const visibleTodos = filteredTodos(todos, filter);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {!!todos.length && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.length} items left`}
            </span>

            <TodoFilter filter={filter} setFilter={setFilter} />

            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}

      </div>

      {!!isError
        && (
          <ErrorMessage
            setIsError={setIsError}
            isError={isError}
          />
        ) }
    </div>
  );
};
