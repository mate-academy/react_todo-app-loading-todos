import '../../styles/index.scss';

type Props = {
  todoLoadError: boolean;
};

export const ErrorNotification = ({ todoLoadError }: Props) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${!todoLoadError ? 'hidden' : ''}`}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {todoLoadError && (
        <>
          Unable to load todos
          <br />
        </>
      )}
      {false && (
        <>
          Title should not be empty
          <br />
        </>
      )}
      {false && (
        <>
          Unable to add a todo
          <br />
        </>
      )}
      {false && (
        <>
          Unable to delete a todo
          <br />
        </>
      )}
      {false && (
        <>
          Unable to update a todo
          <br />
        </>
      )}
    </div>
  );
};
