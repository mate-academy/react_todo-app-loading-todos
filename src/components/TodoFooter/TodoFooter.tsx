import React, { useContext } from 'react';
import { TodoFilter } from '../TodoFilter';
import { DispatchContext, StateContext } from '../../Store';

export const TodoFooter: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const todosToComplete = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer
      data-cy="TodoFooter"
      className="todoapp__footer"
    >
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosToComplete} items left`}
      </span>

      <TodoFilter />

      <button
        type="button"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        className="todoapp__clear-completed"
        onClick={() => dispatch({ type: 'clearCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
