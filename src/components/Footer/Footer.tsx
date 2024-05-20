import React, { useContext } from 'react';

import { DispatchContex, StateContex } from '../../Store';
import { FilterNav } from '../FilterNav';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContex);
  const dispatch = useContext(DispatchContex);

  const hasCompleted = !todos.filter(todo => todo.completed).length;

  const countTodosLeft = todos.filter(t => !t.completed).length;

  const handlerClearCompleted = () => {
    todos.forEach(({ id, completed }) => {
      if (completed) {
        dispatch({ type: 'remove', payload: id });
      }
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countTodosLeft} items left
      </span>

      <FilterNav />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handlerClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
