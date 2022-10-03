import classNames from 'classnames';

type Props = {
  error: boolean;
  errorMessage: string;
  handleError: (boolean: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  errorMessage,
  handleError,
}) => {
  if (error) {
    setTimeout(() => {
      handleError(false);
    }, 3000);
  }

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !error },
      )}
      data-cy="ErrorNotification"
    >
      <button
        aria-label="close"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => handleError(false)}
      />
      {errorMessage}
    </div>
  );
};
