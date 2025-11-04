import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  loading: boolean;
  selected: number | null;
  handleDoubleClick: (todo: Todo) => void;
  selectedTitle: string;
  setSelectedTitle: (str: string) => void;
  isSubmitting: boolean;
}

export const TodoItem = ({
  todo,
  loading,
  selected,
  handleDoubleClick,
  selectedTitle,
  setSelectedTitle,
  isSubmitting,
}: Props) => {
  const statusInputId = `todo-${todo.id}-status`;

  return (
    <div
      data-cy="Todo"
      className={cn('todo ', { completed: todo.completed })}
      key={todo.id}
      onDoubleClick={() => handleDoubleClick(todo)}
    >
      <label
        htmlFor={statusInputId}
        className="todo__status-label"
        aria-label="Toggle todo completion"
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          id={statusInputId}
          checked={todo.completed}
        />
      </label>
      {todo.id === selected ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={selectedTitle}
            onChange={event => setSelectedTitle(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            disabled={isSubmitting}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', { 'is-active': loading })}
      >
        {/* eslint-disable-next-line max-len */}
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
