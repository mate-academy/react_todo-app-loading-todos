/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  error: string | null,
  setError: (value: string | null) => void
};

export const ErrorNotification: React.FC<Props> = ({ error, setError }) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {error}
      {/* Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
    </div>
  );
};
