/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

type Props = {
  error: boolean;
  setError: (value: boolean) => void;
  errorText: string;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  setError,
  errorText,
}) => {
  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(false)}
      />

      {errorText}
    </div>
  );
};
