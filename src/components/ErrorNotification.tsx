import cn from 'classnames';

type Props = {
  onErrorMessage: (value: string) => void,
  errorMessage: string,
};

export const ErrorNotification: React.FC<Props> = (
//   {
//   // onErrorMessage,
//   // errorMessage,
// }
) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        // {
        //   'hidden': !errorMessage,
        // }
      )}
    >
      <button
        data-cy="HideErrorButton"
        aria-label="delete button"
        type="button"
        className="delete"
        // onClick={() => onErrorMessage('')}
      />
      {/* show only one message at a time */}
      Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
