import React from 'react';
import { Filter } from '../types/Filter';
import { TodoFilter } from './TodoFilter';

interface Props {
  isSelected: Filter,
  onTodoFilter: (filterBy: Filter) => void,
}

export const Navigation: React.FC<Props> = ({ isSelected, onTodoFilter }) => (
  <nav className="filter" data-cy="Filter">
    <TodoFilter
      dataAttr="FilterLinkAll"
      hrefAttr="#/"
      name={Filter.ALL}
      isSelected={isSelected}
      onTodoFilter={onTodoFilter}
    />

    <TodoFilter
      dataAttr="FilterLinkActive"
      hrefAttr="#/active"
      name={Filter.ACTIVE}
      isSelected={isSelected}
      onTodoFilter={onTodoFilter}
    />

    <TodoFilter
      dataAttr="FilterLinkCompleted"
      hrefAttr="#/completed"
      name={Filter.COMPLETED}
      isSelected={isSelected}
      onTodoFilter={onTodoFilter}
    />
  </nav>
);
