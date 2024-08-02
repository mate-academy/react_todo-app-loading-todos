import classNames from 'classnames';
import { Errors } from '../enums/Errors';
import React = require('react');

interface ErrorNotificationProps {
  errorMessage: Errors | null;
  clearErrorMessage: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  clearErrorMessage,
}) => {
  return (
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
        onClick={() => clearErrorMessage()}
      />

      {errorMessage}
    </div>
  );
};
