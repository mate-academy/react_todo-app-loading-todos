import React, { useEffect, useRef } from 'react';

interface Props {
  errorMessage: string;
  setErrorMessage: (newErrorMessage: string) => void;
}

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  const errorNoticeRef = useRef<HTMLDivElement>(null);
  const errorNoticeDiv = errorNoticeRef.current as HTMLDivElement;

  const hideErrorNotice = () => {
    errorNoticeDiv.classList.add('hidden');
  };

  const showErrorNotice = () => {
    errorNoticeDiv.classList.remove('hidden');
  };

  useEffect(() => {
    if (errorMessage) {
      showErrorNotice();
      setTimeout(() => {
        hideErrorNotice();
        setErrorMessage('');
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      // eslint-disable-next-line max-len
      className="notification is-danger is-light has-text-weight-normal hidden"
      ref={errorNoticeRef}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={hideErrorNotice}
      />
      {/* Below comments will be removed once 'Error Notification' logic is fully implemented */}
      {/* show only one message at a time */}
      {errorMessage}
      {/* Unable to load todos */}
      <br />
      {/* Title should not be empty */}
      <br />
      {/* Unable to add a todo */}
      <br />
      {/* Unable to delete a todo */}
      <br />
      {/* Unable to update a todo */}
    </div>
  );
};
