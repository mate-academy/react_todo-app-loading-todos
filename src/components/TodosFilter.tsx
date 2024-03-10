import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterOptions } from '../types/FilterOptions';

type Props = {
  todos: Todo[];
  updateTodos: (todoItems: Todo[]) => void;
  filterOption: FilterOptions;
  selectFilterOption: (option: FilterOptions) => void;
};

export const TodosFilter: React.FC<Props> = ({
  todos,
  updateTodos,
  filterOption,
  selectFilterOption,
}) => {
  const handleClearCompletedTodos = (): void => {
    updateTodos(todos.filter(todoItem => !todoItem.completed));
  };

  let notCompletedTodosCount = 0;

  todos.forEach(todo => {
    if (!todo.completed) {
      notCompletedTodosCount += 1;
    }
  });

  const completedTodosCount = todos.length - notCompletedTodosCount;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterOption === FilterOptions.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => selectFilterOption(FilterOptions.all)}
        >
          {FilterOptions.all}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterOption === FilterOptions.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => selectFilterOption(FilterOptions.active)}
        >
          {FilterOptions.active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterOption === FilterOptions.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => selectFilterOption(FilterOptions.completed)}
        >
          {FilterOptions.completed}
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodosCount}
        onClick={handleClearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
