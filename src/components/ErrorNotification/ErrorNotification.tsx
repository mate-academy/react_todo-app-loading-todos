import classNames from 'classnames';

interface Props {
  error: boolean,
  setError: (error: boolean) => void,
}

export const ErrorNotification: React.FC<Props> = ({
  error,
  setError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(false)}
        aria-label="Hide error"
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
