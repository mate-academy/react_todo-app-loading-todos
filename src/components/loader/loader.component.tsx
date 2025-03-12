import React from 'react';
import { LoaderTypes } from './loader.types';
import classNames from 'classnames';

export const LoaderComponent: React.FC<LoaderTypes> = React.memo(
  ({ isLoading }) => {
    return isLoading ? (
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isLoading })}
      >
        {/* overlay will cover the todo while it is being deleted or updated */}
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    ) : null;
  },
);
