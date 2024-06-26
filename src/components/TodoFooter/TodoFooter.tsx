import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setStatus: (status: string) => void;
  status: string;
};

export const TodoFooter: React.FC<Props> = ({ todos, setStatus, status }) => {
  const handleActiveTodos = () => {
    setStatus('active');
  };

  const handleCompletedTodos = () => {
    setStatus('completed');
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === '',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setStatus('')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={handleActiveTodos}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleCompletedTodos}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
