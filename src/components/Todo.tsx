import { LocalTodoType } from '../types/Todo';
import { useState } from 'react';

type Props = { todo: LocalTodoType };

export default function Todo({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      data-cy="Todo"
      className={'todo' + (todo.completed ? ' completed' : '')}
    >
      {isEditing ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      ) : (
        <>
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              readOnly
              checked={todo.completed}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <div
            data-cy="TodoLoader"
            className={
              'modal overlay' + (todo.isFake === true ? ' is-active' : '')
            }
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </>
      )}
    </div>
  );
}
