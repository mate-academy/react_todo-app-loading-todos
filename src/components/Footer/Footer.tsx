import React from 'react';

interface Props {
  todosCount: number;
  completedCount: number;
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export const Footer: React.FC<Props> = ({
  todosCount,
  completedCount,
  filter,
  setFilter,
}) => {
  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter);
  };

  const getFilteredTodosCount = () => {
    if (filter === 'all') {
      return todosCount;
    }

    if (filter === 'active') {
      return todosCount - completedCount;
    }

    if (filter === 'completed') {
      return completedCount;
    }

    return todosCount;
  };

  const filteredTodosCount = getFilteredTodosCount();

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${filteredTodosCount} ${filteredTodosCount === 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('active')}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      {completedCount > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
