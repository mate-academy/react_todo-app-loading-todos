import cn from 'classnames';
import { useMemo } from 'react';
import { FilteredState } from '../types/filteredState';
import { Todo } from '../types/Todo';

type Props = {
  OnFilteredState: FilteredState
  onSetFilteredState: (value: FilteredState) => void
  todos: Todo[]
};

export const Footer: React.FC<Props>
  = ({ OnFilteredState, onSetFilteredState, todos }) => {
    const todosLeft = useMemo(() => {
      return todos.filter(todo => !todo.completed).length;
    }, [todos]);

    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${todosLeft} items left`}
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          <a
            href="#/"
            className={cn(
              'filter__link ',
              { selected: OnFilteredState === FilteredState.All },
            )}
            onClick={() => onSetFilteredState(FilteredState.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn(
              'filter__link ',
              { selected: OnFilteredState === FilteredState.Active },
            )}
            onClick={() => onSetFilteredState(FilteredState.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn(
              'filter__link ',
              { selected: OnFilteredState === FilteredState.Completed },
            )}
            onClick={() => onSetFilteredState(FilteredState.Completed)}
          >
            Completed
          </a>
        </nav>

        {/* don't show this button if there are no completed todos */}

        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>
    );
  };
