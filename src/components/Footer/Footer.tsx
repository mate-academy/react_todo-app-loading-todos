import { FilterType } from '../../types/FilterType';
import { Filter } from '../Filter/Filter';

interface FooterProps {
  filter: string,
  setFilter: (filter: FilterType) => void,
  todosLength: number,
  hasCompletedTodos: boolean,
}

export const Footer: React.FC<FooterProps> = ({
  filter,
  setFilter,
  todosLength,
  hasCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosLength} items left`}
      </span>

      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      <button
        type="button"
        className={`todoapp__clear-completed ${hasCompletedTodos ? 'visible' : 'hidden'}`}
      >
        Clear completed
      </button>
    </footer>
  );
};
