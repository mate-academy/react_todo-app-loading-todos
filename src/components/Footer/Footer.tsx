import { useState } from 'react';

type Props = {
  filterData: (value: string) => void;
  todosCounter: number;
};

export const Footer: React.FC<Props> = ({ filterData, todosCounter }) => {
  const [select, setSelect] = useState('All');

  const handleClick = (filter: string) => {
    setSelect(filter);
    filterData(filter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCounter} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${select === 'All' && 'selected'}`}
          data-cy="FilterLinkAll"
          onClick={() => handleClick('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${select === 'Active' && 'selected'}`}
          data-cy="FilterLinkActive"
          onClick={() => handleClick('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${select === 'Completed' && 'selected'}`}
          data-cy="FilterLinkCompleted"
          onClick={() => handleClick('Completed')}
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
