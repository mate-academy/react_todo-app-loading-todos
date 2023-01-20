/* eslint-disable jsx-a11y/control-has-associated-label */

import { FC } from 'react';
import cn from 'classnames';
import { ErrorMsg } from '../../types/ErrorMsg';
import { SetError } from '../../types/SetError';

type Props = {
  error: boolean;
  errorMsg: ErrorMsg;
  setError: SetError;
};

export const Error: FC<Props> = ({ error, errorMsg, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError()}
      />
      {errorMsg}
    </div>
  );
};
