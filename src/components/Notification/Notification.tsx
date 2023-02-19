import React, { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  errorType: string,
  hasError: boolean,
  onError: Dispatch<SetStateAction<boolean>>,
};

export const Notification: React.FC<Props> = React.memo(({
  errorType,
  hasError,
  onError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      onError(false);
    }, 3000);
  }, []);

  return (
    <div
      className="
        notification
        is-danger
        is-light
        has-text-weight-normal
      "
      hidden={!hasError}
    >
      <button
        type="button"
        className="delete"
        aria-label="delete button"
        onClick={() => {
          onError(false);
        }}
      />

      {`Unable to ${errorType} a todo`}
      <br />
    </div>
  );
});
