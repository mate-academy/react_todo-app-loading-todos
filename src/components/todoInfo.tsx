import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { ModalOverlay } from './modalOverlay';

type Props = {
  todoInfo: Todo,
  addComplitedTodo: (id:number)=> void
};

export const TodoInfo: React.FC<Props> = ({ todoInfo, addComplitedTodo }) => {
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [editedValue, setEditedValue] = useState('');

  const {
    id,
    title,
    completed,
  } = todoInfo;

  const onInputChange = ({ target }:React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(target.value);
  };

  const onInputBlur = () => {
    setIsTodoEditing(false);
  };

  return (
    <div className={`todo ${completed}`}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => addComplitedTodo(id)}
        />
      </label>
      {isTodoEditing ? (
        <form>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedValue}
            onChange={onInputChange}
            onBlur={onInputBlur}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
          >
            {title}

          </span>
          <button type="button" className="todo__remove">×</button>
        </>
      )}

      <ModalOverlay isTodoUpdating={false} />
    </div>
  );
};
