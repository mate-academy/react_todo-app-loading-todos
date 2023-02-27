import React from 'react';
import classNames from 'classnames';

type Props = {
  isTodoUpdating: boolean
};

export const ModalOverlay: React.FC<Props> = ({ isTodoUpdating }) => {
  return (
    <div className={classNames(
      'modal', 'overlay', { 'is-active': isTodoUpdating },
    )}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
