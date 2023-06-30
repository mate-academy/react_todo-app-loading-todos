import cn from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  filter: string,
  todos: Todo[]
  setFilter: (text: string) => void;
}

export const Footer: React.FC<Props> = ({ filter, todos, setFilter }) => {
  const itemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === 'all' })}
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === 'active',
          })}
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === 'completed',
          })}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
