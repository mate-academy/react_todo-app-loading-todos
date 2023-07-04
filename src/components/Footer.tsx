import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

interface FooterProps {
  todos: Todo[],
  filter: Filter,
  handleFilter: (filter: Filter) => void,
}

export const Footer = ({ todos, filter, handleFilter }: FooterProps) => {
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={`filter__link ${filter === Filter.All ? 'selected' : ''}`}
          onClick={() => handleFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === Filter.Active ? 'selected' : ''}`}
          onClick={() => handleFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === Filter.Completed ? 'selected' : ''}`}
          onClick={() => handleFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {hasCompleted && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
