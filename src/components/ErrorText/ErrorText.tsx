import classNames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  errorText: string;
  setErrorText: (value: string) => void;
};

export const ErrorText: React.FC<Props> = ({
  errorText,
  setErrorText,
}) => {
  const [hideError, setHideError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setErrorText(''), 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={
        classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hide: hideError,
          },
        )
      }
    >
      <button
        aria-label="close"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setHideError(true)}
      />
      { errorText }
    </div>
  );
};
