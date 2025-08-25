import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  filter: Filter;
  onChangeFilter: (filter: Filter) => void;
};

const Footer: FC<Props> = ({ filter, onChangeFilter, todos }) => {
  const countActiveTodos = todos.filter(todo => !todo.completed).length;
  const countCompletedTodos = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActiveTodos} {countActiveTodos === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === Filter.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onChangeFilter(Filter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === Filter.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onChangeFilter(Filter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === Filter.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onChangeFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={countCompletedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
