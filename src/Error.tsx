type Props = {
  errorMessage: string;
  setErrorMessage: (newMessage: string) => void;
};

export const Error: React.FC<Props> = ({
  errorMessage,
  setErrorMessage = () => {},
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${!errorMessage && 'hidden'}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
        aria-label="Close error message"
      />
      {errorMessage}
      {/* show only one message at a time */}
      {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
