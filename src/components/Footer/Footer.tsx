import { Todo } from '../../types/Todo';
import { Filter } from '../Filter/Filter';

type Props = {
  filterType: string,
  todosLeft: Todo[],
  handleButtonClickAll: () => void,
  handleButtonClickActive: () => void,
  handleButtonClickCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  filterType,
  todosLeft,
  handleButtonClickAll,
  handleButtonClickActive,
  handleButtonClickCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {filterType
        ? (
          <span className="todo-count" data-cy="todosCounter">
            {`${todosLeft.length} items left`}
          </span>
        ) : (
          <span className="todo-count" data-cy="todosCounter">
            0 items left
          </span>
        )}

      <Filter
        filterType={filterType}
        handleButtonClickAll={handleButtonClickAll}
        handleButtonClickActive={handleButtonClickActive}
        handleButtonClickCompleted={handleButtonClickCompleted}
      />

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
