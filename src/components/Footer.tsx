import React from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filterValue: Filter;
  onClickFilter: (filterValue: Filter) => void;
};

const Footer: React.FC<Props> = ({ todos, filterValue, onClickFilter }) => {
  // Проверка на наличие хотя бы одного completed todo
  const isCompleted = todos.some(todo => todo.completed);
  // Все, которые не complited
  const allNotCompleted = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${allNotCompleted} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filterValue === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => onClickFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filterValue === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => onClickFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterValue === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onClickFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
