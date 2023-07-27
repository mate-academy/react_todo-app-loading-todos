import cn from 'classnames';

type Props = {
  filterType: string,
  setFilterType: (val: string) => void,
  quantity: number,
};

export const Footer = ({
  filterType,
  setFilterType,
  quantity,
}: Props) => {
  return (
    <>
      {/* Hide the footer if there are no todos */}

      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${quantity} items left`}
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          <a
            href="#/"
            className={cn('filter__link', {
              selected: filterType === 'all',
            })}
            onClick={() => setFilterType('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', {
              selected: filterType === 'active',
            })}
            onClick={() => setFilterType('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', {
              selected: filterType === 'completed',
            })}
            onClick={() => setFilterType('completed')}
          >
            Completed
          </a>
        </nav>

        {/* don't show this button if there are no completed todos */}
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>
    </>
  );
};
