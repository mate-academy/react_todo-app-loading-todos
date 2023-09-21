import { useContext } from 'react';
import { TodosContext } from '../context/TodoContext';

type FooterProps = {
  onFilterChange: (filterType: 'all' | 'active' | 'completed') => void;
};

export const Footer = ({ onFilterChange }: FooterProps) => {
  const { todos } = useContext(TodosContext);
  const todosLeft = todos.filter(todo => !todo.completed);
  const todosDone = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosLeft.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className="filter__link selected"
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      {todosDone.length === 0
        && (
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        )}

    </footer>
  );
};
