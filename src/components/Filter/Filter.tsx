import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import './filter.scss';

type Props = {
  onFilterSelect: Dispatch<SetStateAction<Todo[]>>;
  todos: Todo[];
};

enum FilterOptions {
  All = 'All',
  Completed = 'Completed',
  Active = 'Active',
}

const handleFilterSelect = (
  todos: Todo[],
  filter: FilterOptions,
  onFilterSelect: Dispatch<SetStateAction<Todo[]>>,
  setIsSelected: Dispatch<SetStateAction<FilterOptions>>,
) => {
  switch (filter) {
    case FilterOptions.All:
      onFilterSelect(todos);
      setIsSelected(FilterOptions.All);
      break;
    case FilterOptions.Active:
      onFilterSelect(todos.filter(todo => !todo.completed));
      setIsSelected(FilterOptions.Active);
      break;
    case FilterOptions.Completed:
      onFilterSelect(todos.filter(todo => todo.completed));
      setIsSelected(FilterOptions.Completed);
      break;
  }
};

export const Filter: FC<Props> = ({ onFilterSelect, todos }) => {
  const [isSelected, setIsSelected] = useState<FilterOptions>(
    FilterOptions.All,
  );

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: isSelected === FilterOptions.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() =>
          handleFilterSelect(
            todos,
            FilterOptions.All,
            onFilterSelect,
            setIsSelected,
          )
        }
      >
        {FilterOptions.All}
      </a>
      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: isSelected === FilterOptions.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() =>
          handleFilterSelect(
            todos,
            FilterOptions.Active,
            onFilterSelect,
            setIsSelected,
          )
        }
      >
        {FilterOptions.Active}
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: isSelected === FilterOptions.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() =>
          handleFilterSelect(
            todos,
            FilterOptions.Completed,
            onFilterSelect,
            setIsSelected,
          )
        }
      >
        {FilterOptions.Completed}
      </a>
    </nav>
  );
};
