import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { ModalOverlay } from '../ModalOverlay';

type Props = {
  todo: Todo;
  addCompletedTodos: (todoId: number) => void;
};

export const TodoInfo: React.FC<Props> = ({ todo, addCompletedTodos }) => {
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [inputQuery, setInputQuery] = useState(todo.title);

  const handlerOnBlur = () => {
    setIsTodoEditing(false);
  };

  const {
    completed,
    title,
    id,
  } = todo;

  return (
    <>
      <div
        className={cn('todo', { completed })}
        onDoubleClick={() => setIsTodoEditing(true)}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={() => addCompletedTodos(id)}
          />
        </label>

        {isTodoEditing ? (
          <form>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={inputQuery}
              onChange={(event) => setInputQuery(event.target.value)}
              onBlur={handlerOnBlur}
              // eslint-disable-next-line
              autoFocus
            />
          </form>
        )
          : (
            <>
              <span className="todo__title">
                {title}
              </span>
              <button type="button" className="todo__remove">×</button>
            </>
          )}

        {/* overlay will cover the todo while it is being updated */}
        {/* This todo is in loadind state */}
        {/* 'is-active' class puts this modal on top of the todo */}
        <ModalOverlay isTodoUpdated={false} />
      </div>
    </>
  );
};
