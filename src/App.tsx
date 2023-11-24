/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 11880;

enum FilterBy {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  useEffect(() => {
    const loadTodos = async () => {
      setError('');
      try {
        const todos = await getTodos(USER_ID);

        setFilteredTodos(todos);
        setAllTodos(todos);
        setError('');
      } catch (newError) {
        setError('Unable to load todos');
        setTimeout(() => setError(''), 3000);
      }
    };

    loadTodos();
  }, [filterBy]);

  useEffect(() => {
    switch (filterBy) {
      case FilterBy.All:
        setFilteredTodos(allTodos.filter(todo => todo.completed
          || !todo.completed));
        break;
      case FilterBy.Active:
        setFilteredTodos(allTodos.filter(todo => !todo.completed));
        break;
      case FilterBy.Completed:
        setFilteredTodos(allTodos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(allTodos);
        break;
    }
  }, [filterBy, allTodos]);

  const handleFilterClick = (filterType: FilterBy) => (
    event: React.MouseEvent,
  ) => {
    event.preventDefault();
    setFilterBy(filterType);
  };

  const completedTodos = [...allTodos].filter(todo => todo.completed);
  const activeTodos = [...allTodos].filter(todo => !todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section
          className="todoapp__main"
          data-cy="TodoList"
        >
          {filteredTodos.map(todo => {
            return (
              <div
                data-cy="Todo"
                className={classNames('todo', { completed: todo.completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {allTodos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {(activeTodos.length > 1 || activeTodos.length === 0) && `${activeTodos.length} items left`}
              {(activeTodos.length === 1) && `${activeTodos.length} item left`}
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filterBy === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={handleFilterClick(FilterBy.All)}
              >
                All
              </a>

              <a
                href="#/"
                className={`filter__link ${filterBy === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={handleFilterClick(FilterBy.Active)}
              >
                Active
              </a>

              <a
                href="#/"
                className={`filter__link ${filterBy === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={handleFilterClick(FilterBy.Completed)}
              >
                Completed
              </a>
            </nav>

            {completedTodos.length >= 0 && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
