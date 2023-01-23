import React, { memo } from 'react';
import { FilterType } from '../../types/FilterType';
import { Filter } from '../Filter';

type Props = {
  amountOfActiveTodos: number;
  hasCompletedTodos: boolean;
  filterType: FilterType;
  onChangeType: React.Dispatch<React.SetStateAction<FilterType>>;
};

export const Footer: React.FC<Props> = memo((props) => {
  const {
    amountOfActiveTodos,
    hasCompletedTodos,
    filterType,
    onChangeType,
  } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${amountOfActiveTodos} items left`}
      </span>

      <Filter
        filterType={filterType}
        onChangeType={onChangeType}
      />

      {hasCompletedTodos && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
