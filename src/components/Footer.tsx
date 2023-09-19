import { useContext } from 'react';
import cn from 'classnames';
import { GlobalContext } from '../context/GlobalContext';
import { FilterType } from '../types/FilterTypes';

type Props = {
  status: string;
  setStatus: (arg: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ status, setStatus }) => {
  const { todos } = useContext(GlobalContext);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{`${todos.length} items left`}</span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: status === 'all' })}
          onClick={() => setStatus(FilterType.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: status === 'active' })}
          onClick={() => setStatus(FilterType.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: status === 'completed' })}
          onClick={() => setStatus(FilterType.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
