import classNames from 'classnames';
import { FilterOptions } from '../../types/FilterOptions';

interface Props {
  selectedOption: FilterOptions,
  setSelectedOption: (option: FilterOptions) => void,
}

export const TodoFilter: React.FC<Props> = ({
  selectedOption,
  setSelectedOption,
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
          setSelectedOption(FilterOptions.ALL);
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
          setSelectedOption(FilterOptions.ACTIVE);
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
          setSelectedOption(FilterOptions.COMPLETED);
        }}
      >
        Completed
      </a>
    </nav>
  );
};
