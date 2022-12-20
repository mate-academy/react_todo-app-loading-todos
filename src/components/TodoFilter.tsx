import classNames from 'classnames';
import { FilterOptions } from '../types/Filter';

interface Props {
  selectedOption: FilterOptions,
  onOptionChanged: (option: FilterOptions) => void,
}

export const TodoFilter: React.FC<Props> = ({
  selectedOption,
  onOptionChanged,
}) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames(
          'filter__link',
          { selected: selectedOption === FilterOptions.ALL },
        )}
        onClick={() => {
          onOptionChanged(FilterOptions.ALL);
        }}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames(
          'filter__link',
          { selected: selectedOption === FilterOptions.ACTIVE },
        )}
        onClick={() => {
          onOptionChanged(FilterOptions.ACTIVE);
        }}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames(
          'filter__link',
          { selected: selectedOption === FilterOptions.COMPLETED },
        )}
        onClick={() => {
          onOptionChanged(FilterOptions.COMPLETED);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
