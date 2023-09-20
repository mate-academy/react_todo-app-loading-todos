import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setVisibleTodos: (todos: Todo[]) => void,
};

enum Status {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const Footer: React.FC<Props> = ({
  todos,
  setVisibleTodos = () => { },
}) => {
  const [status, setStatus] = useState(Status.ALL);
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const newStatus = event.currentTarget.textContent as Status;

    setStatus(newStatus);
    const completedTodos = todos.filter(todo => todo.completed);
    const activeTodos = todos.filter(todo => !todo.completed);

    switch (newStatus) {
      case Status.ACTIVE:
        setVisibleTodos(activeTodos);
        break;

      case Status.COMPLETED:
        setVisibleTodos(completedTodos);
        break;

      default:
        setVisibleTodos(todos);
    }
  };

  return (
    <footer data-cy="Footer" className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <nav data-cy="Filter" className="filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: status === Status.ALL,
          })}
          onClick={handleClick}
        >
          {Status.ALL}
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Status.ACTIVE,
          })}
          onClick={handleClick}
        >
          {Status.ACTIVE}
        </a>

        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Status.COMPLETED,
          })}
          onClick={handleClick}
        >
          {Status.COMPLETED}
        </a>
      </nav>

      {todos.filter(todo => todo.completed).length > 0 && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
