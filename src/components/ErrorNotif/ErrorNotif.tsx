import { Error } from '../../types/Error';

type Props = {
  errorType?: Error,
  OnCloseNotif: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorType,
  OnCloseNotif,
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
      {/* eslint-disable-next-line */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => OnCloseNotif()}
      />
      {errorMessage(errorType)}
    </div>
  );
};
