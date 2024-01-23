import React from 'react';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  errorMessege: ErrorMessage;
};

export const Notification: React.FC<Props> = ({ errorMessege }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable-next-line */}
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {errorMessege}
    </div>
  );
};
