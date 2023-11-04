import React, { useContext } from 'react';

import { StateContext } from '../../TodoStore';
import { FilterTodo } from './FilterTodo';

export const TodoFooter: React.FC = () => {
  const { initialTodos } = useContext(StateContext);

  const TotalUncompletedTodos = initialTodos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${TotalUncompletedTodos.length} ${TotalUncompletedTodos.length === 1 ? 'item' : 'items'} left`}
      </span>

      <FilterTodo />

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
