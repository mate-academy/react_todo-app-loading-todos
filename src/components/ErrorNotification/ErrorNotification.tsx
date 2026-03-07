import cn from 'classnames';

// type Errors = 'upload' | 'title' | 'add' | 'delete' | 'update' | '';
enum Errors {
  Upload = 'upload',
  Title = 'title',
  Add = 'add',
  Delete = 'delete',
  Update = 'update',
  None = '',
}

type Props = {
  hasError: Errors;
  loadTodos: boolean;
  setHasError: (errorMsg: Errors) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  hasError,
  loadTodos,
  setHasError,
}) => {
  const ERROR_MESSAGES: Record<Errors, string> = {
    [Errors.Upload]: 'Unable to load todos',
    [Errors.Add]: 'Unable to add a todo',
    [Errors.Delete]: 'Unable to delete a todo',
    [Errors.Update]: 'Unable to update a todo',
    [Errors.Title]: 'Title should not be empty',
    [Errors.None]: '',
  };

  return (
    <>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: hasError === Errors.None },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHasError(Errors.None)}
          disabled={loadTodos}
        />
        {ERROR_MESSAGES[hasError]}
      </div>
    </>
  );
};
