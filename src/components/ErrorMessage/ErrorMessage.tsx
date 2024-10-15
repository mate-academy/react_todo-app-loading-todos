import { FC } from 'react';
import cn from 'classnames';

import { Errors } from '../../types/Errors';

interface Props {
  errorMessage: Errors | null;
  onClearError: () => void;
}

export const ErrorMessage: FC<Props> = ({ errorMessage, onClearError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage?.length,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClearError}
      />
      {errorMessage}
    </div>
  );
};
