import { Filter } from './Filter';
import { Sort } from '../types/Sort';

type Props = {
  setSort: (arg: Sort) => void,
  sort: Sort
};

export const Footer: React.FC<Props> = ({ setSort, sort }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <Filter setSort={setSort} sort={sort} />

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
