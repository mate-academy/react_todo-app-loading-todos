import React from 'react';

type Props = {
  error: string | null;
  onHide: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ error, onHide }) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onHide}
    />
    {error}
  </div>
);

export default ErrorNotification;
