import { Todo } from '../../types/Todo';
import { Filter } from '../Filter/Filter';

type Props = {
  filterTodos: string,
  todosLeft: Todo[],
  onClickAll: () => void,
  onClickActive: () => void,
  onClickCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  filterTodos,
  todosLeft,
  onClickAll,
  onClickActive,
  onClickCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {filterTodos
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
        filterTodos={filterTodos}
        onClickAll={onClickAll}
        onClickActive={onClickActive}
        onClickCompleted={onClickCompleted}
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
