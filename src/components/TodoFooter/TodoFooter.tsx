import classNames from 'classnames';
import { TodoCompletedCategory } from '../../types/TodoCompletedCategory';

type Props = {
  countOfNotCompletedTodos: number;
  completedCategory: TodoCompletedCategory;
  onCompletedCategory: (category: TodoCompletedCategory) => void;
};

const activityFilters = {
  [TodoCompletedCategory.active]: 'Active',
  [TodoCompletedCategory.completed]: 'Completed',
  [TodoCompletedCategory.all]: 'All',
};

export const TodoFooter: React.FC<Props> = ({
  countOfNotCompletedTodos,
  completedCategory,
  onCompletedCategory,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countOfNotCompletedTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(TodoCompletedCategory).map(category => (
          <a
            key={category}
            href={`#/${category}`}
            className={classNames('filter__link', {
              selected: completedCategory === category,
            })}
            data-cy={`FilterLink${activityFilters[category]}`}
            onClick={() => onCompletedCategory(category)}
          >
            {activityFilters[category]}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!countOfNotCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
