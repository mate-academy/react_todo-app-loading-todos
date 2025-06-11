import { FilterParams } from '../../App';
import { Filter } from '../Filter';

interface FooterProps {
  countActiveTodos: number;
  selectedFilterParam: FilterParams;
  handleChangeFilterParam: (param: FilterParams) => void;
}

export const Footer: React.FC<FooterProps> = ({
  countActiveTodos,
  selectedFilterParam,
  handleChangeFilterParam,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {countActiveTodos} items left
    </span>

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
