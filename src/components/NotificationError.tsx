import React from 'react';
import classNames from 'classnames';

type Props = {
  showError: string;
  onShowError: (value: string) => void
};

export const NotificationError: React.FC<Props> = ({
  showError,
  onShowError,
}) => {
  return (
    <div
      className={
        classNames(
          'notification, is-danger is-light has-text-weight-normal', {
            hidden: !showError,
          },
        )
      }
    >
      <button
        type="button"
        className="delete"
        aria-label="delete todo"
        onClick={() => onShowError('')}
      />

      <b>{showError}</b>
    </div>
  );
};
