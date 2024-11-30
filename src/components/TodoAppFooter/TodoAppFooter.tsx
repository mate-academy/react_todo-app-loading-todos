import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { selectedFilter } from '../../types/selectedFilter';
import { useState } from 'react';

type Props = {
  todos: Todo[];
  applyFilter: (chosenFilter: selectedFilter) => void;
  deleteCompletedTodos: () => void;
};

export const TodoAppFooter: React.FC<Props> = ({
  todos,
  applyFilter,
  deleteCompletedTodos,
}) => {
  const [selected, setSelected] = useState<selectedFilter>(selectedFilter.All);

  const leftToDo = todos.filter(todo => !todo.completed).length;
  const showButton = todos.filter(todo => todo.completed).length === 0;

  const handleSelecteFilter = (chosenFilter: selectedFilter) => {
    setSelected(chosenFilter);
    applyFilter(chosenFilter);
  };

  const handleClearCompleted = () => {
    deleteCompletedTodos();
  };

  console.log(showButton);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {leftToDo} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selected === selectedFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleSelecteFilter(selectedFilter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selected === selectedFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleSelecteFilter(selectedFilter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selected === selectedFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleSelecteFilter(selectedFilter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: showButton ? 'hidden' : 'visible' }}
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
