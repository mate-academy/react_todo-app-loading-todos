import classNames from 'classnames';
import React from 'react';

type Props = {
  errorMassage: string;
  onClearError: () => void;
};

export const ErrorBox: React.FC<Props> = ({ errorMassage, onClearError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMassage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClearError}
      />
      {errorMassage}
    </div>
  );
};
