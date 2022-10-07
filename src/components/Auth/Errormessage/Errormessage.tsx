import classnames from 'classnames';

type Props = {
  error: boolean;
  setError: (item: boolean) => void;
};

export const Errormessage: React.FC<Props> = ({
  error,
  setError,
}) => {
  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

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
        onClick={() => setError(false)}
      >
        <></>
      </button>

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
