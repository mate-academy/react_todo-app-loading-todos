import classNames from 'classnames';
import React from 'react';

type Props = {
  isLoader: boolean,
  id: number,
  loaderId: number,
};

export const Loader: React.FC<Props> = ({ isLoader, id, loaderId }) => {
  let currentLoader = loaderId;

  if (loaderId === -1) {
    currentLoader = id;
  }

  const isLoaderId = isLoader && id === currentLoader;

  return (
    <div className={classNames('modal overlay', { 'is-active': isLoaderId })}>
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
