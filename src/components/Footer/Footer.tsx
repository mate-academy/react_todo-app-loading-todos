import { FilterType } from '../../types/FilterType';
import { Filter } from '../Filter/Filter';

interface FooterProps {
  filter: string,
  filterSelected: (filter: FilterType) => void,
  todosLength: number,
  hasCompletedTodos: boolean,
}

export const Footer: React.FC<FooterProps> = ({
  filter,
  filterSelected,
  todosLength,
  hasCompletedTodos,
}) => {
  return (
    !todosLength ? (
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${todosLength} items left`}
        </span>

        <Filter
          filter={filter}
          filterSelected={filterSelected}
        />

        <button
          type="button"
          className="todoapp__clear-completed"
          style={{ visibility: hasCompletedTodos ? 'visible' : 'hidden' }}
        >
          Clear completed
        </button>
      </footer>
    )
      : null
  );
};
