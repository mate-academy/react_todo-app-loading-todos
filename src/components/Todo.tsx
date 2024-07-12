/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo as TodoType } from '../types/Todo';
import { TodoForm } from './TodoForm';

interface Props {
  todo: TodoType;
  idsProccesing: number[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, data: Partial<TodoType>) => Promise<void>;
}

export const Todo: FC<Props> = ({ todo, onDelete, onEdit, idsProccesing }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete(todo.id);
    } catch {
      // eslint-disable-next-line no-console
      console.log('Error deleting todo');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (data: Partial<TodoType>) => {
    try {
      setLoading(true);
      await onEdit(todo.id, data);
    } catch {
      // eslint-disable-next-line no-console
      console.log('Error editing todo');
      throw new Error('Error editing todo');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (title: string) => {
    const formattedTitle = title.trim();

    if (!formattedTitle) {
      return handleDelete();
    }

    if (title === todo.title) {
      setIsEditing(false);

      return;
    }

    try {
      await handleEdit({ title: formattedTitle });

      setIsEditing(false);
    } catch {
      // eslint-disable-next-line no-console
      inputRef.current?.focus();
    }
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => handleEdit({ completed: !todo.completed })}
          checked={todo.completed}
        />
      </label>

      {isEditing ? (
        <div onKeyUp={({ key }) => key === 'Escape' && setIsEditing(false)}>
          <TodoForm
            title={todo.title}
            onSubmit={handleEditSubmit}
            inputRef={inputRef}
          />
        </div>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {/* Remove button appears only on hover */}
      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDelete}
        >
          ×
        </button>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': loading || idsProccesing.includes(todo.id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
