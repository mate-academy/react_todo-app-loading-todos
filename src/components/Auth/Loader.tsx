import React from 'react';
import cn from 'classnames';

type Props = {
  isDelete: number[];
  todoId: number;
  updatingTodoIds: number[];
};

export const Loader: React.FC<Props> = ({
  isDelete,
  todoId,
  updatingTodoIds,
}) => {
  return (
    <div
      data-cy="TodoLoader"
      className={cn('modal overlay',
        {
          'is-active': isDelete.includes(todoId)
            || todoId === 0
            || updatingTodoIds.includes(todoId),
        })}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
