import classNames from 'classnames';

interface Props {
  selectedOption: string,
  setSelectedOption: (option: string) => void,
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
          { selected: selectedOption === 'all' },
        )}
        onClick={() => {
          setSelectedOption('all');
        }}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames(
          'filter__link',
          { selected: selectedOption === 'active' },
        )}
        onClick={() => {
          setSelectedOption('active');
        }}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames(
          'filter__link',
          { selected: selectedOption === 'completed' },
        )}
        onClick={() => {
          setSelectedOption('completed');
        }}
      >
        Completed
      </a>
    </nav>
  );
};
