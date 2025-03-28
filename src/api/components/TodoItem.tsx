/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { SubmitForm } from './SubmitForm';

interface Props {
  todo: Todo;
  onChangeTodoStatus: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateTodo: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onChangeTodoStatus,
  onDelete,
  onUpdateTodo,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const { completed, id, title } = todo;

  return (
    <div
      onDoubleClick={() => setIsUpdate(true)}
      key={id}
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => onChangeTodoStatus(id)}
          checked={completed}
        />
      </label>

      {isUpdate ? (
        <SubmitForm
          updateTodo={todo}
          setIsUpdate={setIsUpdate}
          onUpdateTodo={onUpdateTodo}
          inputClassName={'todo__title-field'}
          onDelete={onDelete}
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            contentEditable={isUpdate}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
