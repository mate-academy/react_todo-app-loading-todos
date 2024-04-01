import React from 'react';

import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { Filter } from './Filter';

type Props = {
  onFilter: (value: Status) => void;
  onUncompletedTodos: () => Todo[];
  currentFilterStatus: Status;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  todos,
  onUncompletedTodos,
  onFilter,
  currentFilterStatus,
}) => {
  return (
    <>
      {!!todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${onUncompletedTodos().length} items left`}
          </span>

          <Filter
            onFilter={onFilter}
            currentFilterStatus={currentFilterStatus}
          />
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
