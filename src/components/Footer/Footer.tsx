import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../State/State';
import { deleteAllCompleted } from '../../api/todos';

export const Footer = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  function handleDeleteAll() {
    dispatch({ type: 'clearAll', payload: true });

    deleteAllCompleted(todos)
      .then(() => dispatch({ type: 'updatedAt' }))
      .catch(() => dispatch(
        { type: 'setError', payload: 'Unable to delete a todos' },
      ))
      .finally(() => dispatch({ type: 'clearAll', payload: false }));
  }

  return (
    // {/* Hide the footer if there are no todos */}
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className="filter__link selected"
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleDeleteAll}
      >
        Clear completed
      </button>
    </footer>
  );
};
