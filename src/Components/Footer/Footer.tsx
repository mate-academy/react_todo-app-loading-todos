import classNames from 'classnames';
import { Todo, FilterType } from '../../types/Todo';

type Props = {
  filterBy: FilterType,
  setFilterBy: (value: FilterType) => void,
  todos: Todo[]
};

const filterOptions = Object.values(FilterType);

export const Footer: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  todos,
}) => {
  const itemsLeftLength = todos.filter((todo) => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeftLength} items left`}
      </span>

      <nav className="filter">
        {filterOptions.map((option) => {
          return (
            <a
              key={option}
              href={`#/${option}`}
              className={classNames(
                'filter__link',
                { selected: filterBy === option },
              )}
              onClick={() => setFilterBy(option)}
            >
              {option}
            </a>
          );
        })}
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
