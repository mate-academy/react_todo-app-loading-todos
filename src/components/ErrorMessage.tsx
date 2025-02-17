import { useEffect, useRef } from 'react';
import cn from 'classnames';

type Props = {
  loadingError: boolean;
  setLoadingError: (value: boolean) => void;
};

export const ErrorMessage: React.FC<Props> = ({
  loadingError,
  setLoadingError,
}) => {
  const timerId = useRef(0);

  useEffect(() => {
    timerId.current = window.setTimeout(() => setLoadingError(false), 3000);

    return () => {
      window.clearTimeout(timerId.current);
    };
  });

  const handleCloseNotification = () => {
    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }

    setLoadingError(false);
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !loadingError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Close notification"
        onClick={handleCloseNotification}
      />
      {/* show only one message at a time */}
      {loadingError && 'Unable to load todos'}
      {/* <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
