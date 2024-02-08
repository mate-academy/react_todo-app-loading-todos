import React, { useContext } from 'react';
import { TodoFilter } from './TodoFilter';
import { DispatchContext, StateContext } from '../management/TodoContext';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.some(todo => todo.completed);

  const handleDeleteAllCompleted = () => {
    dispatch({ type: 'deleteCompletedTodo' });
  };

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

      {/* Active filter should have a 'selected' class */}
      <TodoFilter />

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos}
        onClick={handleDeleteAllCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
