import React, { useMemo } from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import { Todo } from '../../types/Todo';
import { FilterNav } from './FilterNav';

type Props = {
  todos: Todo[];
  todoStatus: TodoStatus;
  handleStatusSelect: (status: TodoStatus) => void;
};

export const TodosFilter: React.FC<Props> = ({
  todos,
  todoStatus,
  handleStatusSelect,
}) => {
  const todosLeft = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <FilterNav
        todoStatus={todoStatus}
        onSelect={handleStatusSelect}
      />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
