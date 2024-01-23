import classNames from 'classnames';

type Props = {
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Errors:React.FC<Props> = ({
  error,
  setError,
}) => {
  const unableToLoad = 'Unable to load todos';
  const shouldNotBeEmpty = 'Title should not be empty';
  const unableToAdd = 'Unable to add a todo';
  const unableToDelete = 'Unable to delete a todo';
  const unableToUpdate = 'Unable to update a todo';

  const handelClearError = () => {
    setError(null);
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: error === null },
      )}
    >
      {/* eslint-disable-next-line  */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handelClearError}
      />
      {error === unableToLoad && 'Unable to load todos'}
      {error === shouldNotBeEmpty && 'Title should not be empty'}
      {error === unableToAdd && 'Unable to add a todo'}
      {error === unableToDelete && 'Unable to delete a todo'}
      {error === unableToUpdate && 'Unable to update a todo'}
    </div>
  );
};
