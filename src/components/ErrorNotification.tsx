import React from 'react';
import classNames from 'classnames';

type ErrorNotificationProps = {
  errorMessage: string | null;
  onHide: () => void;
};

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  onHide,
}) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !errorMessage },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onHide}
    />
    {errorMessage}
  </div>
);

export default ErrorNotification;
