import classNames from 'classnames';

type Props = {
  error: boolean,
  setError: (param: boolean) => void,
};

export const Error: React.FC<Props> = ({
  error,
  setError,
}) => {
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
        aria-label="close error"
        onClick={() => setError(false)}
      />
      Unable to update todos
    </div>
  );
};
