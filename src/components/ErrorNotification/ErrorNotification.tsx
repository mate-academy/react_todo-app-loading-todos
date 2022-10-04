import cN from 'classnames';

type Props = {
  errorLoad: boolean,
  setErrorLoad: (value: boolean) => void,
};
export const ErrorNotification: React.FC<Props> = ({
  errorLoad,
  setErrorLoad,
}) => {
  if (errorLoad) {
    setTimeout(() => {
      setErrorLoad(false);
    }, 3000);
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={cN(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorLoad },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorLoad(false)}
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
