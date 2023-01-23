import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const Loader: React.FC<Props> = ({ todo }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={cn(
        'modal overlay',
        { 'is-active': !todo },
      )}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
