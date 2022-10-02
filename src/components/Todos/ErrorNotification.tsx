import classNames from 'classnames';

type Props = {
  error: boolean;
  setError: (err: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({ error, setError }) => {
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
        aria-label="HideErrorButton"
        onClick={() => setError(false)}
      />

      Unable to update todos
    </div>
  );
};
