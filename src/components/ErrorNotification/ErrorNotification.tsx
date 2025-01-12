import classNames from 'classnames';
import React from 'react';

type Props = {
  isErrorVisible: boolean;
  closeError: (hideError: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  isErrorVisible,
  closeError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !isErrorVisible,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => closeError(false)}
      />
      {/* show only one message at a time */}
      Unable to load todos
      {/* <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
