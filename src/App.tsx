/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { getAllTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { Filters } from './utils/enums';

const USER_ID = 10306;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hasErrorMessage, setHasErrorMessage] = useState(true);
  const [addError, setAddError] = useState(false);
  const deleteError = false;
  const updateError = false;

  useEffect(() => {
    getAllTodos(USER_ID)
      .then(setTodos);
  }, []);

  const handleFilterSelection = useCallback((value: string) => {
    setSelectedFilter(value);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (selectedFilter) {
        case Filters.All:
          return true;

        case Filters.Active:
          return !completed;

        case Filters.Completed:
          return completed;

        default:
          return 0;
      }
    });
  }, [selectedFilter]);

  if (!USER_ID) {
    setAddError(true);
    setTimeout(() => {
      setAddError(false);
    }, 3000);
    setHasErrorMessage(true);

    return <UserWarning />;
  }

  const isAnyError = addError || deleteError || updateError;

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

        <section className="todoapp__main">

          {visibleTodos.map(todo => (
            <div className={cn(
              'todo',
              { completed: todo.completed },
            )}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span className="todo__title">{todo.title}</span>
              <button type="button" className="todo__remove">×</button>

              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${todos.length} items left`}
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={cn(
                'filter__link',
                { selected: selectedFilter === Filters.All },
              )}
              onClick={() => handleFilterSelection(Filters.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn(
                'filter__link',
                { selected: selectedFilter === Filters.Active },
              )}
              onClick={() => handleFilterSelection(Filters.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn(
                'filter__link',
                { selected: selectedFilter === Filters.Completed },
              )}
              onClick={() => handleFilterSelection(Filters.Completed)}
            >
              Completed
            </a>
          </nav>

          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {isAnyError && (
        <div className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: hasErrorMessage },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setHasErrorMessage(false)}
          />

          {(addError && 'Unable to add a todo')
          || (deleteError && 'Unable to delete a todo')
          || (updateError && 'Unable to update a todo')}
        </div>
      )}
    </div>
  );
};
