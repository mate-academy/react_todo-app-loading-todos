import React, { useContext } from 'react';
import { Filters } from '../Filters';
import { StateContext } from '../../Store';
import { Todo } from '../../types/Todo';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const isActiveTodos = todos.filter((todo: Todo) => !todo.completed);
  const isDisableCompleted = todos.some((todo: Todo) => todo.completed);

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {isActiveTodos.length} items left
        </span>

        {/* Active link should have the 'selected' class + */}
        <Filters />

        {/* this button should be disabled if there are no completed todos + */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={!isDisableCompleted}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
