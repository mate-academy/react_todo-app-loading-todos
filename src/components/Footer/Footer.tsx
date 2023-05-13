import React from 'react';
import { Filter } from '../Filter/Filter';

interface Props {
  hasCompletedTodos: boolean;
  activeTodosCount: number;
  filter: string;
  setFilter: (filter: string) => void;
}

export const Footer: React.FC<Props> = ({
  hasCompletedTodos,
  activeTodosCount,
  filter,
  setFilter,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <Filter filter={filter} setFilter={setFilter} />

      {hasCompletedTodos && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
