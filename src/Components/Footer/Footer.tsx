import React from 'react';
import { Filter } from '../Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedStatus: string;
  onSelectedStatus: (selectedStatus: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  selectedStatus,
  onSelectedStatus,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <Filter
        selectedStatus={selectedStatus}
        onSelectedStatus={onSelectedStatus}
      />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
