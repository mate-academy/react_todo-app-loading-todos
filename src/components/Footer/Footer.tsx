import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { Filter } from '../Filter';

interface Props {
  todos: Todo[];
  filterBy: Status;
  onAllClick: () => void;
  onActiveClick: () => void;
  onCompletedClick: () => void;
}

export const Footer: React.FC<Props> = React.memo(({
  todos,
  filterBy,
  onAllClick,
  onActiveClick,
  onCompletedClick,
}) => {
  const activeTodosLength = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const hasCompleted = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosLength} items left`}
      </span>
      <Filter
        currentStatus={filterBy}
        handleFilterAll={onAllClick}
        handleFilterActive={onActiveClick}
        handleFilterCompleted={onCompletedClick}
      />

      {hasCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
