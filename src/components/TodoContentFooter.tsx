import { FC } from 'react';
import classNames from 'classnames';
import { getEnumKeys } from '../helpers/getEnumKeys';
import { TodoStatus } from '../types/TodoStatus';

interface TodoContentFooterProps {
  selectedStatusTodo: TodoStatus,
  onSelectStatusTodo: (status: TodoStatus) => void
}

export const TodoContentFooter: FC<TodoContentFooterProps> = (props) => {
  const { selectedStatusTodo, onSelectStatusTodo } = props;
  const statusKeys = getEnumKeys(TodoStatus);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        {statusKeys.map(status => (
          <a
            href="#/"
            className={classNames(
              'filter__link',
              {
                selected: selectedStatusTodo === status,
              },
            )}
            key={status}
            onClick={() => onSelectStatusTodo(TodoStatus[status])}
          >
            {status}
          </a>
        ))}
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
