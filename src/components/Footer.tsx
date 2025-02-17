import '../styles/todoapp.scss';

import React, { useState } from 'react';
import { FilterType } from '../types/FilterType';
import { Filter } from '../components/Filter';

type Props = {
  todoCount: { todosLeft: number; todoCompleted: number };
  setFilter: (filter: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ todoCount, setFilter }) => {
  const [isSelected, setIsSelected] = useState(FilterType.All);

  const handleSelect = (filter: FilterType) => {
    setFilter(filter);
    setIsSelected(filter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todoCount.todosLeft} items left
      </span>

      <Filter isSelected={isSelected} handleSelect={handleSelect} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        style={{
          visibility: todoCount.todoCompleted > 0 ? 'visible' : 'hidden',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
