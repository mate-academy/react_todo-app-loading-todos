import { memo } from 'react';
import { FilterType } from '../../types/FilterType';
import { Filter } from '../Filter/Filter';

type Props = {
  activeTodosAmount: number;
  hasCompletedTodos: boolean;
  filterType: FilterType;
  onChangeFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
};

export const Footer: React.FC<Props> = memo((props) => {
  const {
    activeTodosAmount,
    hasCompletedTodos,
    filterType,
    onChangeFilterType,
  } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosAmount} items left`}
      </span>

      <Filter
        filterType={filterType}
        onChangeFilterType={onChangeFilterType}
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
