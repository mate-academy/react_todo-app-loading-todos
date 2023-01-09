/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useEffect, useRef,
} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';

type Props = {
  todos: Todo[],
};

export const TodosForm: React.FC<Props> = ({ todos }) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  const currentLocation = useLocation();

  const filtredTodos = () => {
    const toFilter = todos.filter(item => {
      switch (currentLocation.pathname) {
        case FilterType.Active:
          return !item.completed;
        case FilterType.Completed:
          return item.completed;
        default:
          return item;
      }
    });

    return toFilter;
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
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

      <TodoList
        todos={filtredTodos()}
      />

      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="todosCounter">
          {todos.filter(todo => !todo.completed).length}
          {' '}
          items left
        </span>

        <nav className="filter" data-cy="Filter">
          <NavLink
            data-cy="FilterLinkAll"
            to="/"
            className={({ isActive }) => classNames(
              'filter__link', { selected: isActive },
            )}
          >
            All
          </NavLink>

          <NavLink
            data-cy="FilterLinkActive"
            to="/active"
            className={({ isActive }) => classNames(
              'filter__link', { selected: isActive },
            )}

          >
            Active
          </NavLink>
          <NavLink
            data-cy="FilterLinkCompleted"
            to="/completed"
            className={({ isActive }) => classNames(
              'filter__link', { selected: isActive },
            )}

          >
            Completed
          </NavLink>
        </nav>

        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};
