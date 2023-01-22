/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';

interface ErrorNotificationProps {
  error: string;
}
export const ErrorNotification: FC<ErrorNotificationProps> = ({ error }) => {
  return (
    <>
      {error && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
          />
        </div>
      )}
    </>
  );
};
