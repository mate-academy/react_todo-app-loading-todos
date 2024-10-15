import { FC } from 'react';
import { FilterOptions } from '../../types/FilterOptions';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  currentFilter: FilterOptions;
  onFilterOptionChange: (status: FilterOptions) => void;
}

export const Footer: FC<Props> = ({
  todos,
  currentFilter,
  onFilterOptionChange,
}) => {
  const todosLeft = todos.reduce(
    (current, todo) => current + (!todo.completed ? 1 : 0),
    0,
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterOptions).map(option => (
          <a
            key={option}
            href={`#/${option.toLowerCase()}`}
            className={cn('filter__link', {
              selected: currentFilter === option,
            })}
            data-cy={`FilterLink${option}`}
            onClick={() => onFilterOptionChange(option)}
          >
            {option}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
