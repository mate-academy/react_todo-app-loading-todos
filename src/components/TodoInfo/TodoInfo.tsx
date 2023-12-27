import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onCompletionChange: (todoId: number) => void,
  onRemoveTodo: (todoId: number) => void,
};

export const TodoInfo: React.FC<Props> = (
  {
    todo,
    onCompletionChange,
    onRemoveTodo,
  },
) => {
  const { title, completed, id } = todo;

  function handleCheckboxChange() {
    onCompletionChange(id);
  }

  function handleRemoveButton() {
    onRemoveTodo(id);
  }

  return (
    <div data-cy="Todo" className={completed ? 'todo completed' : 'todo'}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          onClick={handleCheckboxChange}
          className="todo__status"
          checked
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        { title }
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleRemoveButton}
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
