/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

enum FilterOption {
  Default = '',
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

type Props = {
  todos: Todo[],
  onSetTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

function filterTodos(option: FilterOption, todos: Todo[]) {
  const filteredTodos = todos.filter(todo => {
    switch (option) {
      case FilterOption.Active: {
        return todo.completed === false;
      }

      case FilterOption.Completed: {
        return todo.completed === true;
      }

      default: {
        return todo;
      }
    }
  });

  return filteredTodos;
}

const OPTIONS = [FilterOption.All, FilterOption.Completed, FilterOption.Active];

export const Footer: React.FC<Props> = ({ todos, onSetTodos }) => {
  const [selectedOption, setSelectedOption] = useState(FilterOption.Default);

  useEffect(() => {
    setSelectedOption(FilterOption.All);
  }, []);

  const handleFilterTodos = (option: FilterOption) => {
    onSetTodos(filterTodos(option, todos));
    setSelectedOption(option);
  };

  const counterTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${counterTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {OPTIONS.map(option => {
          const isSelected = selectedOption === option;

          return (
            <a
              key={option}
              href={`#/${option.toLowerCase()}`}
              data-cy={`FilterLink${option}`}
              className={cn(
                'filter__link',
                { selected: isSelected },
              )}
              onClick={() => handleFilterTodos(option)}
            >
              {option}
            </a>
          );
        })}
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
