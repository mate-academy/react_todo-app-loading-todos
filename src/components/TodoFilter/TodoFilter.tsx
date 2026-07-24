import cn from 'classnames';

import { TodoFilterEnum } from '../../enums/TodoFilter';

const filterLabels: Record<TodoFilterEnum, string> = {
  [TodoFilterEnum.All]: 'All',
  [TodoFilterEnum.Active]: 'Active',
  [TodoFilterEnum.Completed]: 'Completed',
};

type Props = {
  todoFilter: TodoFilterEnum;
  leftItems: number;
  hasCompletedTodo: boolean;
  onFilterChange: (filter: TodoFilterEnum) => void;
};

export const TodoFilter = ({
  todoFilter,
  leftItems,
  hasCompletedTodo,
  onFilterChange,
}: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${leftItems} ${leftItems === 1 ? 'item' : 'items'} left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(TodoFilterEnum).map(type => (
          <a
            key={type}
            href={type === TodoFilterEnum.All ? '#/' : `#/${type}`}
            className={cn('filter__link', type === todoFilter && 'selected')}
            data-cy={`FilterLink${filterLabels[type]}`}
            onClick={() => onFilterChange(type)}
          >
            {filterLabels[type]}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
