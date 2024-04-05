import { useContext } from 'react';
import { Filter } from '../Filter/Filter';
import { StateContext } from '../../store/Store';

{
  /* Hide the footer if there are no todos */
}

export const Footer = () => {
  const { todos } = useContext(StateContext);
  const getUnCompletedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {getUnCompletedTodos.length} items left
      </span>
      <Filter />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={Boolean(!getUnCompletedTodos.length)}
      >
        Clear completed
      </button>
    </footer>
  );
};
