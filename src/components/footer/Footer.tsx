import cn from 'classnames';

interface Props {
  setFilter: (filter: string) => void;
  selectedFilter: string;
  itemsLeft: number;
  completedTodos: number;
}

export const Footer: React.FC<Props> = ({
  setFilter,
  selectedFilter,
  itemsLeft,
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer">

      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedFilter === 'all',
          })}
          onClick={() => {
            setFilter('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedFilter === 'active',
          })}
          onClick={() => {
            setFilter('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedFilter === 'completed',
          })}
          onClick={() => {
            setFilter('completed');
          }}
        >
          Completed
        </a>
      </nav>

      {completedTodos !== 0 && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
