interface ErrorNotificationProps {
  error: string | null;
  onHideError: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
  onHideError,
}) => {
  const className = error
    ? 'notification is-danger is-light has-text-weight-normal'
    : 'hidden';

  return (
    <div data-cy="ErrorNotification" className={className}>
      <button
        data-cy="HideErrorButton"
        type="button"
        className={error ? 'delete' : 'hidden'}
        onClick={() => onHideError()}
      />
      {/* show only one message at a time
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
      {error}
    </div>
  );
};
