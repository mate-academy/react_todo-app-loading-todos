import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../store/store';
import cn from 'classnames';
import { IsUseTodos } from '../../types/IsUseTodos';

export const Footer = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, useTodos } = useContext(StateContext);

  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <>
      {!!todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todosLeft} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: useTodos === IsUseTodos.All,
              })}
              data-cy="FilterLinkAll"
              onClick={() =>
                dispatch({ type: 'setUseTodos', name: IsUseTodos.All })
              }
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: useTodos === IsUseTodos.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={() =>
                dispatch({ type: 'setUseTodos', name: IsUseTodos.Active })
              }
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: useTodos === IsUseTodos.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() =>
                dispatch({ type: 'setUseTodos', name: IsUseTodos.Completed })
              }
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => dispatch({ type: 'removeAllCompeted' })}
            disabled={todosLeft === todos.length}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
