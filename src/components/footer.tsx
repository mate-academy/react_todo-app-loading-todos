import React, { useState } from 'react';
import cn from 'classnames';
import { FilterType } from '../types/enums';

type Props = {
  onSetfilterType: (value: string) => void;
};

const Footer: React.FC<Props> = ({ onSetfilterType }) => {
  const [selectedType, setSelectedType] = useState(FilterType.All);

  return (
    //{/* TODO: Hide the footer if there are no todos */}
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* TODO: Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedType === FilterType.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            onSetfilterType(FilterType.All);
            setSelectedType(FilterType.All);
          }}
        >
          {FilterType.All}
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedType === FilterType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            onSetfilterType(FilterType.Active);
            setSelectedType(FilterType.Active);
          }}
        >
          {FilterType.Active}
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedType === FilterType.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            onSetfilterType(FilterType.Completed);
            setSelectedType(FilterType.Completed);
          }}
        >
          {FilterType.Completed}
        </a>
      </nav>

      {/* TODO: this button should be disabled if there are no completed todos */}
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

export default Footer;
