import cn from 'classnames';

type Props = {
  hasError: boolean;
  closeErrors: () => void;
};

export const ErrorMessages: React.FC<Props> = ({ hasError, closeErrors }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !hasError,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="delete"
        onClick={closeErrors}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
