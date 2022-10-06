import classnames from 'classnames';
import { useEffect } from 'react';

type Props = {
  error: boolean | null;
  handleErrorChange: (bool: boolean | null) => void;
  errorText: string;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  handleErrorChange,
  errorText,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleErrorChange(null);
    }, 3000);

    return (() => {
      clearTimeout(timeout);
    });
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={classnames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        aria-label="HideErrorButton"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => handleErrorChange(false)}
      />

      {errorText}
    </div>
  );
};
