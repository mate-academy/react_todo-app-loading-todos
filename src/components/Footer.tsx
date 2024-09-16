import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../managment/TodoContext';
import { TodoFilter } from './TodoFilter';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.some(todo => todo.completed);

  const handleRemoveCompletedTodos = () => {
    dispatch({
      type: 'deleteCompletedTodo',
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <TodoFilter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos}
        onClick={handleRemoveCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
