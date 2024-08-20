import classNames from 'classnames';
import React from 'react';

type Props = {
  errorMessage: boolean;
  setErrorMessage: (err: boolean) => void;
  // isHidden: boolean;
};

export const Error: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
  // isHidden,
}) => {
  // console.log(errorMessage);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(true)}
      />
      {/* show only one message at a time */}
      Unable to load todos
    </div>
  );
};
