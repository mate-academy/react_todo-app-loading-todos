import { TodoFilter } from './TodoFilter';

type Props = {
  todosQty: number,
  selectedTodo: (value: string) => void,
  isSelectedTodo: string,
};

export const Footer: React.FC<Props> = ({
  todosQty,
  selectedTodo,
  isSelectedTodo,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosQty} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <TodoFilter
        selectedTodo={selectedTodo}
        isSelectedTodo={isSelectedTodo}
      />
      {/* don't show this button if there are no completed todos */}
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
