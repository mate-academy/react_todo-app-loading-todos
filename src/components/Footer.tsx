import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Filter } from '../App';

type Props = {
  todos: Todo[];
  selectedNav: Filter;
  handelFilter: (e: React.MouseEvent) => void;
};

type FilterNavProps = {
  selectedNav: Filter;
  handelFilter: (e: React.MouseEvent) => void;
};

const FilterNav: React.FC<FilterNavProps> = ({ selectedNav, handelFilter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(Filter).map(filter => (
        <a
          key={filter}
          href={`#${filter}`}
          className={classNames('filter__link', {
            selected: selectedNav === filter,
          })}
          data-cy={`FilterLink${filter}`}
          onClick={handelFilter}
        >
          {filter}
        </a>
      ))}
    </nav>
  );
};

const Footer = ({ todos, selectedNav, handelFilter }: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <FilterNav selectedNav={selectedNav} handelFilter={handelFilter} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
