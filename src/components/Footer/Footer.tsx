import classNames from 'classnames';
import { TodoFilter } from '../../types/TodoFilter';

type FooterProps = {
  currentFilter: TodoFilter;
  setCurrentFilter: React.Dispatch<React.SetStateAction<TodoFilter>>;
};

export const Footer: React.FC<FooterProps> = ({
  currentFilter,
  setCurrentFilter,
}) => {
  // Обробник кліку на батьківському елементі
  const handleFilter = (filterParam: TodoFilter) => {
    setCurrentFilter(filterParam);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: currentFilter === TodoFilter.All },
          )}
          onClick={() => {
            handleFilter(TodoFilter.All);
          }}
        >
          {TodoFilter.All}
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: currentFilter === TodoFilter.Active },
          )}
          onClick={() => {
            handleFilter(TodoFilter.Active);
          }}
        >
          {TodoFilter.Active}
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: currentFilter === TodoFilter.Completed },
          )}
          onClick={() => {
            handleFilter(TodoFilter.Completed);
          }}
        >
          {TodoFilter.Completed}
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
