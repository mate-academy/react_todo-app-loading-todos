import { Filter } from '../Filter';
import { FilterParams } from '../../constants/filter';

type Props = {
  countOfActiveTodos: number;
  selectedFilterParam: FilterParams;
  handleChangeFilterParam: (param: FilterParams) => void;
};
export const Footer: React.FC<Props> = ({
  countOfActiveTodos,
  selectedFilterParam,
  handleChangeFilterParam,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countOfActiveTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <Filter
        selectedFilterParam={selectedFilterParam}
        handleChangeFilterParam={handleChangeFilterParam}
      />

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
