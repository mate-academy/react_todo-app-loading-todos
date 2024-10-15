import { Dispatch, SetStateAction } from 'react';
import { FilterOption } from '../../types';
import { Filter } from '../Filter/Filter';

type Props = {
  filterOption: FilterOption;
  setFilterOption: Dispatch<SetStateAction<FilterOption>>;
  todosAmount: number;
  uncompletedTodosAmount: number;
};
export const Footer: React.FC<Props> = ({
  filterOption,
  setFilterOption,
  todosAmount,
  uncompletedTodosAmount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodosAmount} items left
      </span>

      <Filter filterOption={filterOption} onFilter={setFilterOption} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={uncompletedTodosAmount === todosAmount}
      >
        Clear completed
      </button>
    </footer>
  );
};
