import classNames from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setError: (errorMessage: string) => void;
  filt: FilterStatus,
  setFilt: React.Dispatch<React.SetStateAction<FilterStatus>>,
};

export const Footer:React.FC<Props> = ({
  todos,
  setError,
  filt,
  setFilt,
}) => {
  const filteredTodos = todos.filter(todo => !todo.completed).length;
  const filtToComplete = todos.filter(todo => todo.completed).length;

  const handleDeleteCompleted = () => {
    setError('Unable to update a todo');
  };

  const handleChange = (status: FilterStatus) => {
    setFilt(status);
  };

  return (
    <>
      {todos
      && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${filteredTodos} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames(
                'filter__link',
                { selected: filt === FilterStatus.All },
              )}
              data-cy="FilterLinkAll"
              onClick={() => handleChange(FilterStatus.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames(
                'filter__link',
                { selected: filt === FilterStatus.Active },
              )}
              data-cy="FilterLinkActive"
              onClick={() => handleChange(FilterStatus.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames(
                'filter__link',
                { selected: filt === FilterStatus.Completed },
              )}
              data-cy="FilterLinkCompleted"
              onClick={() => handleChange(FilterStatus.Completed)}
            >
              Completed
            </a>
          </nav>
          <div>
            {filtToComplete > 0
          && (
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleDeleteCompleted}
            >
              Clear completed
            </button>
          )}
          </div>
        </footer>
      )}
    </>
  );
};
