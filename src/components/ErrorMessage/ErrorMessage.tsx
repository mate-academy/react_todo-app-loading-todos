/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { Errors } from '../../types/Errors';

interface Props {
  error: Errors | '',
  isVisible: boolean,
  onClose: () => void,
}

export const ErrorMessage: React.FC<Props> = ({
  error,
  isVisible,
  onClose,
}) => {
  return (
    <div className={cn(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !isVisible },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={onClose}
      />

      {error}
    </div>
  );
};
