import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';
import { TodosFilter } from '../types/TodosFilter';

type Props = {
  currentTodos: Todo[];
  filter: TodosFilter;
  setFilter: Dispatch<SetStateAction<TodosFilter>>;
};

export const TodoFooter: React.FC<Props> = (
  { currentTodos, filter, setFilter },
) => {
  const unsolvedTodosLength = currentTodos
    .filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${unsolvedTodosLength} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <TodoFilter filter={filter} setFilter={setFilter} />

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
