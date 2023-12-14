import React from 'react';
import { Filter } from '../TodosFilter';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  activeTodos: Todo[],
  todosStatus: Status,
  setTodosStatus: (s: Status) => void,
};

export const Footer: React.FC<Props> = ({
  todosStatus,
  setTodosStatus,
  activeTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <Filter setTodosStatus={setTodosStatus} todosStatus={todosStatus} />

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
};
