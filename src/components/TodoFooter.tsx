import { TodoSelecet } from './TodoSelected';

type Props = {
  onTodoSelected: (value: string) => void,
  isTodoSelected: string,
  count: number,
};

export const TodoFooter: React.FC<Props> = ({
  onTodoSelected,
  isTodoSelected,
  count,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${count} items left`}
      </span>

      <TodoSelecet
        onTodoSelected={onTodoSelected}
        isTodoSelected={isTodoSelected}
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
