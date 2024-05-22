import { memo, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

export const TodoFooter: React.FC = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const { todos, filter } = state;

  const filterOptions: Filter[] = ['All', 'Active', 'Completed'];
  const buttonDisabled = todos.filter(todo => todo.completed).length === 0;
  // TODO check after UPD implementation
  const activeTodosAmount = todos.filter(todo => !todo.completed).length;

  const handleSetFiltration = (event: React.MouseEvent<HTMLAnchorElement>) => {
    dispatch({
      type: 'SET_FILTER',
      payload: event.currentTarget.innerText as Filter,
    });
  };

  return (
    // TODO better condition to show footer? todos.length > 0
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${activeTodosAmount} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            {filterOptions.map(value => (
              <a
                key={value}
                href={`#/${value === 'All' ? '' : value.toLowerCase()}`}
                className={classNames('filter__link', {
                  selected: value === filter,
                })}
                data-cy={`FilterLink${value}`}
                onClick={handleSetFiltration}
              >
                {value}
              </a>
            ))}
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={buttonDisabled}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
});

TodoFooter.displayName = 'TodoFooter';
