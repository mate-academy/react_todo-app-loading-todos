type ErrorsProps = {
  error: string | null;
  setError: (error: string | null) => void;
};

export const Errors: React.FC<ErrorsProps> = ({ error, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification
        is-danger is-light
        has-text-weight-normal ${!error ? 'hidden' : ''}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {/* show only one message at a time */}
      {error}

      {/*
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
