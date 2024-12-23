import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { TodoFilter } from '../TodoFilter';
import { StatusFilter } from '../../types/StatusFilter';
import { Todo } from '../../types/Todo';

type Props = {
  filter: StatusFilter;
  setFilter: Dispatch<SetStateAction<StatusFilter>>;
  todos: Todo[];
};

export const TodosFooter: React.FC<Props> = props => {
  const { filter, setFilter, todos } = props;

  const todosLeftCount = useMemo(
    () =>
      todos.filter(todo => {
        return !todo.completed;
      }).length,
    [todos],
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeftCount} items left
      </span>

      <TodoFilter filter={filter} setFilter={setFilter} />

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
