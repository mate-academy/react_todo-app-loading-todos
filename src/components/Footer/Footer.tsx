import { FC } from 'react';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { FilterBy } from '../../types/types';

interface Props {
  activeTodosCount: number;
  completedTodosCount: number;
  filteredBy: FilterBy;
  setFilteredBy: (newFilter: FilterBy) => void;
}

export const Footer: FC<Props> = ({
  activeTodosCount,
  completedTodosCount,
  filteredBy,
  setFilteredBy,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <TodoFilter
        filter={filteredBy}
        onSelect={setFilteredBy}
      />

      {completedTodosCount > 0 && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
