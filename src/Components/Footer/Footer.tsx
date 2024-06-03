import { Todo } from '../../types/Todo';
import cn from 'classnames';

type FooterProps = {
  todos: Todo[];
  status: string;
  setStatus: (status: string) => void;
};
export const Footer: React.FC<FooterProps> = ({ todos, status, setStatus }) => {
  const activeTodoCount = todos.filter(todo => !todo.completed).length;
  const completedTodoCount = todos.filter(todo => todo.completed).length;

  const handleStatusChange = (newStatus: string) => () => {
    setStatus(newStatus);
  };

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${activeTodoCount} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={cn('filter__link', { selected: status === 'all' })}
            data-cy="FilterLinkAll"
            onClick={handleStatusChange('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', { selected: status === 'active' })}
            data-cy="FilterLinkActive"
            onClick={handleStatusChange('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', { selected: status === 'completed' })}
            data-cy="FilterLinkCompleted"
            onClick={handleStatusChange('completed')}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={!completedTodoCount}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
