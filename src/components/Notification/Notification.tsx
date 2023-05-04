import React from 'react';
import classnames from 'classnames';

interface Props {
  error: string | null
  onClose: (value: string | null) => void

}

export const Notification: React.FC<Props> = ({ error, onClose }) => {
  return (
    <div className={classnames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !error },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => onClose(null)}
        aria-label="button-delete"
      />
      {error}
    </div>
  );
};
