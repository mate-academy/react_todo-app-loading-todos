import classNames from 'classnames';

interface Props {
  status: string;
  filterTodos: (value: string) => void;
}

const statuses = [
  {
    path: '',
    title: 'All',
  },
  {
    path: 'active',
    title: 'Active',
  },
  {
    path: 'completed',
    title: 'Completed',
  },
];

export const Footer: React.FC<Props> = ({ status, filterTodos }) => (
  <footer className="todoapp__footer">
    <span className="todo-count">3 items left</span>
    <nav className="filter">
      {statuses.map(({ title, path }) => (
        <a
          key={title}
          href={`#/${path}`}
          className={classNames('filter__link', { selected: status === title })}
          onClick={() => filterTodos(title)}
        >
          {title}
        </a>
      ))}
    </nav>

    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
