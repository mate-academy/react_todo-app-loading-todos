import classNames from 'classnames';

interface Props {
  todosLoadingError: boolean;
}

export const ErrorNotification: React.FC<Props> = ({ todosLoadingError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !todosLoadingError },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {todosLoadingError && <>Unable to load todos</>}
      {false && (
        <>
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </>
      )}
    </div>
  );
};
