import cn from 'classnames';

type Props = {
  errorMessage: string,
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !errorMessage,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        aria-label="delete button"
        type="button"
        className="delete"
      />
      {errorMessage}
      {/*
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
