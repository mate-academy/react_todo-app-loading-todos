import React, { useContext } from 'react';
import { StateContext } from '../Context/StateContext';
import { TodoFilter } from './TodoFilter';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {activeTodos === 1 ? (
        <span className="todo-count" data-cy="TodosCounter">
          {`${activeTodos} item left`}
        </span>
      ) : (
        <span className="todo-count" data-cy="TodosCounter">
          {`${activeTodos} items left`}
        </span>
      )}

      <TodoFilter />

      {completedTodos && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
