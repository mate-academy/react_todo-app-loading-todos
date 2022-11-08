/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import { AuthContext } from './components/Auth/AuthContext';
import { FilterType } from './types/filterType';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { ErrorType } from './types/errorType';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [error, setError] = useState(ErrorType.NONE);

  useEffect(() => {
    const getTodosFromApi = async () => {
      try {
        const userId = user ? user.id : 1;

        const response = await getTodos(userId);

        setTodos(response);
        setVisibleTodos(response);
      } catch (err) {
        setError(ErrorType.UPLOAD);

        setTimeout(() => setError(ErrorType.NONE), 3000);
      }
    };
    // focus the element with `ref={newTodoField}`

    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromApi();
  }, []);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterType) {
        case FilterType.ACTIVE:
          return !todo.completed;
        case FilterType.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [todos, filterType]);

  const handleAddError = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setError(ErrorType.ADD);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {(todos.length > 0) && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
              onClick={() => setError(ErrorType.UPDATE)}
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onKeyDown={(event => handleAddError(event))}
              onFocus={() => setError(ErrorType.NONE)}
            />
          </form>
        </header>

        {(todos.length > 0) && (
          <>
            <TodoList todos={visibleTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                4 items left
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={cn('filter__link', {
                    selected: filterType === FilterType.ALL,
                  })}
                  onClick={() => setFilterType(FilterType.ALL)}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={cn('filter__link', {
                    selected: filterType === FilterType.ACTIVE,
                  })}
                  onClick={() => setFilterType(FilterType.ACTIVE)}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={cn('filter__link', {
                    selected: filterType === FilterType.COMPLETED,
                  })}
                  onClick={() => setFilterType(FilterType.COMPLETED)}
                >
                  Completed
                </a>
              </nav>

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
                onClick={() => setError(ErrorType.DELETE)}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: error === ErrorType.NONE },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(ErrorType.NONE)}
        />

        {(error === ErrorType.ADD) && (
          'Unable to add a todo'
        )}

        {(error === ErrorType.DELETE) && (
          'Unable to delete a todo'
        )}

        {(error === ErrorType.UPDATE) && (
          'Unable to update a todo'
        )}

        {(error === ErrorType.UPLOAD) && (
          'Unable to upload a todo'
        )}
      </div>
    </div>
  );
};
