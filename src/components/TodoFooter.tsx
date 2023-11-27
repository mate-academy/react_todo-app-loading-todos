import { Filter } from '../types/Filter';
import { TodoSelecet } from './TodoSelected';

type Props = {
  onTodoSelected: (value: Filter) => void,
  filter: string,
  count: number,
};

export const TodoFooter: React.FC<Props> = ({
  onTodoSelected,
  filter,
  count,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${count} items left`}
      </span>

      <TodoSelecet
        onTodoSelected={onTodoSelected}
        filter={filter}
      />

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
