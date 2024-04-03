import { Status } from '../types/Status';
import cn from 'classnames';

type Props = {
  itemsLeft: number;
  filter: Status;
  setFilter: (state: Status) => void;
};

export const Footer: React.FC<Props> = ({
  itemsLeft,
  filter,
  setFilter,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {`${itemsLeft} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      {Object.values(Status).map(state => (
        <a
          key={state}
          href="#/"
          className={cn('filter__link', {
            selected: state === filter,
          })}
          data-cy={`FilterLink${state}`}
          onClick={() => setFilter(state)}
        >
          {state}
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
