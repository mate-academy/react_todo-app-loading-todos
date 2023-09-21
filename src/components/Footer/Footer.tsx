import cn from 'classnames';
import { useContext, useState } from 'react';
import { SortType, TodosContext } from '../TodosContext/TodosContext';

export const Footer = () => {
  const { todos, setFilterType } = useContext(TodosContext);
  const [selectedFilter, setSelectedFilter] = useState(SortType.All);

  const countActiveTodo = todos
    .filter(todo => todo.completed === false).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${countActiveTodo} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedFilter === SortType.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            setFilterType(SortType.All);
            setSelectedFilter(SortType.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedFilter === SortType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setFilterType(SortType.Active);
            setSelectedFilter(SortType.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedFilter === SortType.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setFilterType(SortType.Completed);
            setSelectedFilter(SortType.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
