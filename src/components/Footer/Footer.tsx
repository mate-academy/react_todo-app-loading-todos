import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../store/reducer';
import { ActionType } from '../../types/ReducerTypes';
import { FilterField } from '../../types/FilterField';
import cn from 'classnames';

export const Footer = () => {
  const { todos, filterField } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodosAmount = todos.reduce(
    (acc, todo) => (todo.completed ? acc : acc + 1),
    0,
  );

  const setFilter = (newFilterField: FilterField) => {
    if (filterField !== newFilterField) {
      dispatch({ type: ActionType.SetFilterField, payload: newFilterField });
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosAmount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterField === FilterField.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterField.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterField === FilterField.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterField.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterField === FilterField.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterField.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
