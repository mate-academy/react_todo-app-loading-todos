import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { TodoFilter } from '../TodoFilter/TodoFilter';

type Props = {
  todos: Todo[];
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  filter,
  onFilterChange,
}) => {
  const activeTodosCount = todos.filter(t => !t.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <TodoFilter filter={filter} onFilterChange={onFilterChange} />

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
