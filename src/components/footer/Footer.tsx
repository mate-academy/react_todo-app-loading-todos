import classNames from 'classnames';

type Props = {
  noCompleteTodos: boolean,
  filterBy: string,
  setFilterBy: (value: string) => void
};

const navigation = ['All', 'Active', 'Completed'];

export const Footer: React.FC<Props> = ({
  noCompleteTodos,
  filterBy,
  setFilterBy,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <nav className="filter">

        {navigation.map((nav) => {
          return (
            <a
              key={nav}
              href="#/"
              className={classNames(
                'filter__link',
                { selected: filterBy === nav },
              )}
              onClick={() => setFilterBy(nav)}
            >
              {nav}
            </a>
          );
        })}
      </nav>

      {noCompleteTodos && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
