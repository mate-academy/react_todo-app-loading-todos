import classNames from 'classnames';

interface Props {
  error: string,
  setHideError: (value: boolean) => void,
  hideError: boolean,
  setError: (value: string) => void
}

export const ErrorMessage: React.FC<Props> = ({
  error,
  setHideError,
  hideError,
  setError,
}) => {
  setTimeout(() => setError(''), 3000);

  return (
    <>
      {error.length > 0 && (
        <div
          data-cy="ErrorNotification"
          className={
            classNames(
              'notification is-danger is-light has-text-weight-normal',
              {
                hidden: hideError,
              },
            )
          }
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            aria-label="delete"
            onClick={() => setHideError(true)}
          />
          {error}
        </div>
      )}
    </>
  );
};
