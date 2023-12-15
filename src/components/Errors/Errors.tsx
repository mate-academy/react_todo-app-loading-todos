import { ErrorType } from '../../types/ErorTypes';

type Props = {
  error: ErrorType | null;
  onError: (errors: boolean) => void;
};

export const Errors: React.FC<Props> = ({ error, onError }) => {
  const getErrorMessage = () => {
    switch (error) {
      case ErrorType.LoadError:
        return 'Unable to load todos';

      case ErrorType.TitleError:
        return 'Title should not be empty';

      case ErrorType.AddError:
        return 'Unable to add a todo';

      case ErrorType.DeleteError:
        return 'Unable to delete a todo';

      case ErrorType.UpdateError:
        return 'Unable to update a todo';

      default:
        return null;
    }
  };

  const handleHideMessage = () => {
    onError(false);
  };

  return (
    error ? (
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"

      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleHideMessage}
          aria-label="Close message"
        />
        {getErrorMessage()}
      </div>
    ) : null
  );
};
