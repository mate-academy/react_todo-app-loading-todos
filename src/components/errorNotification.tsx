interface ErrorProps {
  errorText: string;
  setErrorText: (errorText: string) => void;
}

export const ErrorNotification: React.FC<ErrorProps> = ({
  errorText,
  setErrorText,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${errorText === '' && 'hidden'}`}
    >
      <button
        onClick={() => setErrorText('')}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {errorText}
    </div>
  );
};

// Unable to load todos
// Title should not be empty
// Unable to add a todo
// Unable to delete a todo
// Unable to update a todo
