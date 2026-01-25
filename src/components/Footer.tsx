import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  currentFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  currentFilter,
  onFilterChange,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{activeCount} items left</span>

      <nav className="filter">
        <a
          href="#/"
          className={currentFilter === 'all' ? 'selected' : ''}
          onClick={() => onFilterChange('all')}
        >
          All
        </a>
        <a
          href="#/active"
          className={currentFilter === 'active' ? 'selected' : ''}
          onClick={() => onFilterChange('active')}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={currentFilter === 'completed' ? 'selected' : ''}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </a>
      </nav>
    </footer>
  );
};
