import React from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../../App';

type Props = {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessage>>;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !errorMessage,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(ErrorMessage.default)}
      />
      {errorMessage}
    </div>
  );
};
