import classNames from 'classnames';

type Props = {
  message: string;
  setErrorMessage: (message: string) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  message,
  setErrorMessage,
}) => {
  function handleHideErrorButton() {
    setErrorMessage('');
  }

  if (message) {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !message },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleHideErrorButton}
      />
      {message}

      {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
