type Filter = 'all' | 'active' | 'completed';

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
  itemsLeft: number;
}

export const Footer: React.FC<Props> = ({
  filter,
  onChange,
  itemsLeft,
}) => (
  <footer className="todoapp__footer">
    <span data-cy="TodosCounter" className="todo-count">
      {itemsLeft} items left
    </span>

    <nav className="filter">
      {(['all', 'active', 'completed'] as Filter[]).map(f => (
        <a
          key={f}
          href="#/"
          data-cy={`FilterLink${f[0].toUpperCase()}${f.slice(1)}`}
          className={filter === f ? 'selected' : ''}
          onClick={() => onChange(f)}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </a>
      ))}
    </nav>
  </footer>
);
