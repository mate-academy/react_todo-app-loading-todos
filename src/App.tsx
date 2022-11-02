/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { debounce } from 'lodash';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { TodosList } from './components/TodosList';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';

enum FilterBy {
  ALL,
  ACTIVE,
  COMPLETED,
}

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [error, setError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterBy>(FilterBy.ALL);

  const getTodosFromApi = async () => {
    try {
      if (user) {
        const apiTodos = await getTodos(user.id).then(gotTodos => gotTodos);

        setTodos(apiTodos);
        setVisibleTodos(apiTodos);
      }
    } catch {
      setError(true);
    }
  };

  const filterTodos = (filterBy: FilterBy) => {
    if (todos) {
      setVisibleTodos(todos.filter((todo: Todo) => {
        switch (filterBy) {
          case FilterBy.ACTIVE:
            return !todo.completed;
          case FilterBy.COMPLETED:
            return todo.completed;
          default:
            return true;
        }
      }));
    }
  };

  const handleFilter = (filterBy: FilterBy) => {
    filterTodos(filterBy);
    setSelectedFilter(filterBy);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromApi();
  }, []);

  const todosLength = () => {
    return todos?.filter(todo => !todo.completed).length || '0';
  };

  const debounceCallback = useCallback(
    () => setError(false), [],
  );

  const onSetError = useMemo(
    () => debounce(debounceCallback, 3000),
    [],
  );

  const closeError = () => {
    setError(false);
  };

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

        {visibleTodos && (
          <>
            <TodosList todos={visibleTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${todosLength()} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={cn('filter__link',
                    { selected: selectedFilter === FilterBy.ALL })}
                  onClick={() => handleFilter(FilterBy.ALL)}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={cn('filter__link',
                    { selected: selectedFilter === FilterBy.ACTIVE })}
                  onClick={() => handleFilter(FilterBy.ACTIVE)}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={cn('filter__link',
                    { selected: selectedFilter === FilterBy.COMPLETED })}
                  onClick={() => handleFilter(FilterBy.COMPLETED)}
                >
                  Completed
                </a>
              </nav>

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
                disabled={todosLength() === 0}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {error && (
        <ErrorNotification onClose={onSetError} closeError={closeError} />
      )}
    </div>
  );
};
