import React, { useState } from 'react';

type Props = {
  errorType: string
};

export const Error:React.FC<Props> = ({ errorType }) => {
  const [hide, setHide] = useState(false);

  setTimeout(() => {
    setHide(true);
  }, 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
      hidden={hide}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Save"
        onClick={() => setHide(true)}
      />
      {errorType}
      <br />
    </div>
  );
};
