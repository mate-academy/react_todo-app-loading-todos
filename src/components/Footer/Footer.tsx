import { FilterStatus } from '../../types/Filter';
import { Filter } from '../Filter';

type Props = {
  remainingTodos: number,
  completedTodos: number,
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>,
  filterStatus: string,
};

export const Footer: React.FC<Props> = ({
  remainingTodos,
  completedTodos,
  setFilterStatus,
  filterStatus,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${remainingTodos} items left`}
      </span>

      <Filter setFilterStatus={setFilterStatus} filterStatus={filterStatus} />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: `${!completedTodos ? 'hidden' : 'visible'}` }}
      >
        Clear completed
      </button>
    </footer>
  );
};
