import { FC, memo, useContext } from 'react';
import { TodosContext } from './TodosContext';

export const TodosFooter: FC<{ todosCount: number }> = memo(({
  todosCount,
}) => {
  const {
    setTodos,
    filterType,
    setFilterType,
  } = useContext(TodosContext);

  return (
    <div className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={`filter__link ${filterType === 'all' ? 'selected' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={`filter__link ${filterType === 'active' ? 'selected' : ''}`}
          onClick={() => setFilterType('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={`filter__link ${filterType === 'completed' ? 'selected' : ''}`}
          onClick={() => setFilterType('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={() => setTodos(prev => prev.filter(item => !item.completed))}
      >
        Clear completed
      </button>
    </div>
  );
});
