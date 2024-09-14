import { memo, useEffect, useRef } from 'react';
import { ErrorMessages } from '../../types/Errors';

type Props = {
  errorMessage: ErrorMessages;
};

export const ErrorMessage: React.FC<Props> = memo(function ErrorNotification({
  errorMessage,
}) {
  const errorNotification = useRef<HTMLDivElement>(null);

  const deleteNotification = () => {
    errorNotification.current?.classList.add('hidden');
  };

  useEffect(() => {
    if (errorMessage) {
      errorNotification.current?.classList.remove('hidden');

      setTimeout(deleteNotification, 3000);
    }
  }, [errorMessage]);

  return (
    <div
      ref={errorNotification}
      data-cy="ErrorNotification"
      className="
        notification is-danger is-light
        has-text-weight-normal hidden
      "
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={deleteNotification}
      />

      {errorMessage}
    </div>
  );
});
