import cn from 'classnames';

type Errors = 'upload' | 'title' | 'add' | 'delete' | 'update' | '';

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
  return (
    <>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          hasError ? '' : 'hidden',
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHasError('')}
          disabled={loadTodos}
        />
        {/* show only one message at a time */}
        <div className={cn('notification', { hidden: !hasError })}>
          {hasError === 'upload'
            ? 'Unable to load todos'
            : hasError === 'add'
              ? 'Unable to add a todo'
              : hasError === 'title'
                ? 'Title should not be empty'
                : hasError === 'delete'
                  ? 'Unable to delete a todo'
                  : hasError === 'update'
                    ? 'Unable to update a todo'
                    : ''}
        </div>
      </div>
    </>
  );
};
