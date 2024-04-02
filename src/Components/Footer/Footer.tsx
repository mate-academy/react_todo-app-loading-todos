import cn from 'classnames';

import { StatesOfFilter } from '../../types/StatesOfFilter';
// eslint-disable-next-line max-len
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

type Props = {
  onSetFilter: (state: StatesOfFilter) => void;
  countOfTodos: number;
  selectedFilter: StatesOfFilter;
};

export const Footer: React.FC<Props> = ({
  onSetFilter,
  countOfTodos,
  selectedFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countOfTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(StatesOfFilter).map(state => (
          <a
            key={state}
            href={`#/${state}`}
            className={cn('filter__link', {
              selected: selectedFilter === state,
            })}
            data-cy={`FilterLink${capitalizeFirstLetter(state)}`}
            onClick={() => {
              onSetFilter(state);
            }}
          >
            {capitalizeFirstLetter(state)}
          </a>
        ))}
      </nav>

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
