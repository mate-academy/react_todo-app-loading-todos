import classnames from 'classnames';

type Props = {
  error: boolean,
  setError: (value: boolean) => void,
  errorText: string;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  setError,
  errorText,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classnames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="HideErrorButton"
        onClick={() => setError(false)}
      />

      {errorText}
    </div>
  );
};
