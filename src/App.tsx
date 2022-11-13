/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState, useMemo,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [isSelected, setIsSelected] = useState('');
  const [hasError, setHasError] = useState(false);

  const loadTodos = async () => {
    setHasError(false);

    try {
      const todosFromServer = user && await getTodos(user.id);

      if (todosFromServer) {
        setTodos(todosFromServer);
      }
    } catch (error) {
      setHasError(true);
      throw new Error('There are not todos for this user');
    }
  };

  const visibleTodos = useMemo(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterType) {
        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;

        default:
          return todos;
      }
    });

    return filteredTodos;
  }, [todos, filterType]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  });

  const handleChangeFilterButton = (event:
  React.MouseEvent<HTMLAnchorElement>) => {
    setIsSelected(event.currentTarget.text);

    switch (event.currentTarget.text) {
      case 'Active':
        return setFilterType(FilterType.ACTIVE);

      case 'Completed':
        return setFilterType(FilterType.COMPLETED);

      default:
        return setFilterType(FilterType.ALL);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
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

        <section className="todoapp__main" data-cy="TodoList">
          <ul>
            {visibleTodos.map(todo => {
              const { title, completed, id } = todo;

              return (
                <li
                  data-cy="Todo"
                  key={id}
                  className={classNames('todo',
                    { completed })}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      defaultChecked
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDeleteButton"
                  >
                    ×
                  </button>

                  <div data-cy="TodoLoader" className="modal overlay">
                    <div
                      className="modal-background has-background-white-ter"
                    />

                    <div className="loader" />
                  </div>
                </li>
              );
            })}

          </ul>
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todos.filter(todo => !todo.completed).length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                href="#/"
                className={classNames('filter__link',
                  { selected: isSelected === 'All' })}
                onClick={handleChangeFilterButton}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                href="#/active"
                className={classNames('filter__link',
                  { selected: isSelected === 'Active' })}
                onClick={handleChangeFilterButton}
              >
                Active
              </a>
              <a
                data-cy="FilterLinkCompleted"
                href="#/completed"
                className={classNames('filter__link',
                  { selected: isSelected === 'Completed' })}
                onClick={handleChangeFilterButton}
              >
                Completed
              </a>
            </nav>

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification', 'is-danger', 'is-light', 'has-text-weight-normal',
          { hidden: !hasError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setHasError(false);
          }}
        />

        There is some error!
      </div>
    </div>
  );
};
