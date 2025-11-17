import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import '../../styles/todoItem.scss';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  isLoading: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isEditing,
  isLoading,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const id = `todo-status-${todo.id}`;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <label htmlFor={id} className="todo__status-label">
        <span className="visually-hidden">Toggle todo</span>
      </label>
      <input
        id={id}
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {!isEditing ? (
        <>
          <span data-cy="TodoTitle" className="todoTitle">
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
            disabled={isLoading}
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();

            const element = e.currentTarget.elements.namedItem('title');

            if (element instanceof HTMLInputElement) {
              const newTitle = element.value.trim();

              if (newTitle) {
                onEdit(todo.id, newTitle);
              }
            }
          }}
        >
          <input
            name="title"
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            defaultValue={todo.title}
            autoFocus
          />
        </form>
      )}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
