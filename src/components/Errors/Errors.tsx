import classNames from 'classnames';
import React from 'react';

import { ErrorMessages } from '../../types/ErrorMessages';

type Props = {
  message: string;
  onRemoveError: () => void;
};

export const Errors: React.FC<Props> = ({ message, onRemoveError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        message === ErrorMessages.noError ? ' hidden' : '',
      )}
    >
      {message}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onRemoveError}
      />
    </div>
  );
};
