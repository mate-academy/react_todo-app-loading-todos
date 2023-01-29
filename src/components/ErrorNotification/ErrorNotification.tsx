import { Error } from '../../types/Error';

type Props = {
  errorType?: Error,
  onCloseNotification: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorType,
  onCloseNotification,
}) => {
  const errorMessage = (type?: Error) => {
    switch (type) {
      case Error.LOAD:
        return 'An error occured when loading todos!';
      case Error.ADD:
        return 'Unable to add a todo';
      case Error.DELETE:
        return 'Unable to delete a todo';
      case Error.UPDATE:
        return 'Unable to update a todo';

      default:
        return 'Oops..!Something went wrong';
    }
  };

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        aria-label="Hide error"
        type="button"
        className="delete"
        onClick={() => onCloseNotification()}
      />
      {errorMessage(errorType)}
    </div>
  );
};
