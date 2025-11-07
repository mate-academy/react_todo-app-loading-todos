import { TodoNavigatoin } from './TodoNavigation';

import { Status } from '../types/StatusEnum';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  status: Status;
  activeTodos: Todo[];
  onSwitch: (status: Status) => void;
};

export const TodoFooter: React.FC<Props> = ({
  status,
  activeTodos,
  onSwitch,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <TodoNavigatoin status={status} onSwitch={onSwitch} />

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
