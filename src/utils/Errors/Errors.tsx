import classNames from 'classnames';

type Props = {
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Errors:React.FC<Props> = ({
  error,
  setError,
}) => {
  const handelClearError = () => {
    setError(null);
  };

  if (!error) {
    return null;
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: error === null },
      )}
    >
      {/* eslint-disable-next-line */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handelClearError}
      />
      {error}
    </div>
  );
};
