import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[] | null,
  status: string,
  setStatus: (status: string) => void,
  areCompleted: Todo[] | null,
  handleClearCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  visibleTodos,
  status,
  setStatus,
  areCompleted,
  handleClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {visibleTodos?.length !== 1
          ? `${visibleTodos?.length} items left`
          : `${visibleTodos.length} item left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: status === 'All',
          })}
          onClick={() => setStatus('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: status === 'Active',
          })}
          onClick={() => setStatus('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: status === 'Completed',
          })}
          onClick={() => setStatus('Completed')}
        >
          Completed
        </a>
      </nav>

      {areCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
