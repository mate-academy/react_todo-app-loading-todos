import classnames from 'classnames';
import React from 'react';
import { Todo } from './types/Todo';
import { FilteredBy } from './types/FilteredBy';

type Props = {
  todosToShow: Todo[],
  todoStatus: string,
  setTodoStatus: (todoStatus: FilteredBy) => void,
};

export const Footer: React.FC<Props> = ({
  todosToShow,
  todoStatus,
  setTodoStatus,
}) => {
  const activeTodosLeft = todosToShow.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosLeft.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classnames(
            'filter__link',
            { selected: todoStatus === FilteredBy.ALL },
          )}
          onClick={() => setTodoStatus(FilteredBy.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classnames(
            'filter__link',
            { selected: todoStatus === FilteredBy.ACTIVE },
          )}
          onClick={() => setTodoStatus(FilteredBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classnames(
            'filter__link',
            { selected: todoStatus === FilteredBy.COMPLETED },
          )}
          onClick={() => setTodoStatus(FilteredBy.COMPLETED)}
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
