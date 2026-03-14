interface IErrorMessage {
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

export const ErrorMessage: React.FC<IErrorMessage> = ({
  errorMessage,
  setErrorMessage,
}) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setErrorMessage(null)}
    />

    {errorMessage}
  </div>
);
