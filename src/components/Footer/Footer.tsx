import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  todos: Todo[];
  todoStatus: TodoStatus;
  setTodoStatus: (status: TodoStatus) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  todoStatus,
  setTodoStatus,
}) => {
  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const completedItems = todos.filter(todo => todo.completed).length;

  const onFilterChange = (filter: TodoStatus) => () => {
    setTodoStatus(filter);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: todoStatus === TodoStatus.ALL },
          )}
          onClick={onFilterChange(TodoStatus.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: todoStatus === TodoStatus.ACTIVE },
          )}
          onClick={onFilterChange(TodoStatus.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: todoStatus === TodoStatus.COMPLETED },
          )}
          onClick={onFilterChange(TodoStatus.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {completedItems > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
