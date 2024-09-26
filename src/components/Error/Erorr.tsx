import React from 'react';
import { Errors } from '../../types/Errors';
import cn from 'classnames';

type Props = {
  errorText: Errors;
  onHideError: () => void;
};

export const Error: React.FC<Props> = ({ errorText, onHideError }) => (
  <div
    data-cy="ErrorNotification"
    className={cn(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      {
        hidden: errorText === Errors.NoError,
      },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onHideError}
    />
    {errorText}
  </div>
);
