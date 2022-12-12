import React from 'react';
import { TodoFilter } from './TodoFilter';

interface Props {
  isSelected: string,
  onTodoFilter: (filterBy: string) => void,
}

export const Navigation: React.FC<Props> = ({ isSelected, onTodoFilter }) => (
  <nav className="filter" data-cy="Filter">
    <TodoFilter
      dataAttr="FilterLinkAll"
      hrefAttr="#/"
      name="All"
      isSelected={isSelected}
      onTodoFilter={onTodoFilter}
    />

    <TodoFilter
      dataAttr="FilterLinkActive"
      hrefAttr="#/active"
      name="Active"
      isSelected={isSelected}
      onTodoFilter={onTodoFilter}
    />

    <TodoFilter
      dataAttr="FilterLinkCompleted"
      hrefAttr="#/completed"
      name="Completed"
      isSelected={isSelected}
      onTodoFilter={onTodoFilter}
    />
  </nav>
);
