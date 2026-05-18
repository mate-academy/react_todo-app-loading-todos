/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useClickOutside } from '../../hooks/useClickOutside';

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  const [title, setTitle] = useState(todo.title);
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading] = useState(false);
  const inputRef = useClickOutside<HTMLInputElement>(() => {
    setIsEditing(false);
  });

  return (
    <div data-cy="Todo" className={cn('todo', { completed: isChecked })}>
      <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
        />
      </label>
      {isEditing ? (
        <form>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>
          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
}
