import cn from 'classnames';
import { FC } from 'react';
import { Error } from '../../types/Error';

interface Props {
  errorMessage: Error | null;
  setErrorMessage: (error: Error | null) => void;
}

export const ErrorMessages: FC<Props> = ({
  errorMessage,
  setErrorMessage,

}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: errorMessage === null,
      })}
    >
      <button
        aria-label="Hide Notification"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(null)}
      />
      {errorMessage}
    </div>
  );
};
