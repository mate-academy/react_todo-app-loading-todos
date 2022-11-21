import classNames from 'classnames';

type Props = {
  isError: boolean;
  setIsError: (error: boolean) => void;
};

export const ErrorNotes: React.FC<Props> = ({ isError, setIsError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="label"
        onClick={() => setIsError(false)}
      />

      {isError && 'Unable to download todos from server'}
      {/* <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
