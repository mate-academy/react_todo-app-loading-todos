import classNames from 'classnames';

type ErrorProps = {
  error: string;
  setError: (item: string) => void;
};

export default function Error({ error, setError }: ErrorProps) {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !error,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      {error}
    </div>
  );
}
