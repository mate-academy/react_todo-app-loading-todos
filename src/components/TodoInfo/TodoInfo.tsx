import { useState } from 'react';
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
  const [isEdited, setIsEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const { title, completed, id } = todo;

  function handleCheckboxChange() {
    onCompletionChange(id);
  }

  function handleRemoveButton() {
    onRemoveTodo(id);
  }

  function handleClickOnTodo() {
    setIsEdited(true);
  }

  const handleEdition: React.ChangeEventHandler<HTMLInputElement>
  = (event) => {
    setEditedTitle(event.target.value);
  };

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

      {isEdited ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={handleEdition}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleClickOnTodo}
          >
            { title }
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleRemoveButton}
          >
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
