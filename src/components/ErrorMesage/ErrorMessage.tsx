/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';

interface Props {
  isError: boolean;
  onClose: () => void;
}

export const ErrorMessage: React.FC<Props> = ({
  isError,
  onClose,
}) => {
  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal', {
        hidden: !isError,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={onClose}
      />
      Unable to load todos
    </div>
  );
};
