import React from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { Filter } from '../Filter';

interface Props {
  todos: Todo[];
  filterBy: Status;
  onAllclick: () => void;
  onActiveClick: () => void;
  onCompletedclick: () => void;
}

export const Footer: React.FC<Props> = React.memo(({
  todos,
  filterBy,
  onAllclick,
  onActiveClick,
  onCompletedclick,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <Filter
        currentStatus={filterBy}
        handleFilterAll={onAllclick}
        handleFilterActive={onActiveClick}
        handleFilterCompleted={onCompletedclick}
      />

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
});
