import React, { memo } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const Loader: React.FC<Props> = memo(({ todo }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={classnames(
        'modal overlay',
        { 'is-active': !todo },
      )}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
});
