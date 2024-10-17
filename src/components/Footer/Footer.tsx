import React from 'react';
import cn from 'classnames';

import { SelectedType } from '../../types/SelectedType';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedOption: SelectedType;
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectedType>>;
};

export const Footer: React.FC<Props> = ({
  selectedOption,
  setSelectedOption,
  todos,
}) => {
  const filtersOptionName = Object.values(SelectedType);
  const notCompleteedCount = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {notCompleteedCount} items left
        </span>

        <nav className="filter" data-cy="Filter">
          {filtersOptionName.map(filterElement => {
            const filterActiveUrl =
              filterElement === SelectedType.ALL
                ? '#/'
                : `#/${filterElement.toLowerCase()}`;

            return (
              <a
                key={filterElement}
                href={filterActiveUrl}
                className={cn('filter__link', {
                  selected: filterElement === selectedOption,
                })}
                data-cy={`FilterLink${filterElement}`}
                onClick={() => setSelectedOption(filterElement)}
              >
                {filterElement}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
