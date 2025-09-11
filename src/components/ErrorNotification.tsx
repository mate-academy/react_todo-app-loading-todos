import React from 'react';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
  onHideErrorButtonClick: (message: string) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onHideErrorButtonClick,
}) => {
  return (
    //{/* DON'T use conditional rendering to hide the notification */}
    //{/* Add the 'hidden' class to hide the message smoothly */}
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        errorMessage ? '' : 'hidden',
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onHideErrorButtonClick('')}
      />
      {errorMessage}
      <br />
    </div>
  );
};
