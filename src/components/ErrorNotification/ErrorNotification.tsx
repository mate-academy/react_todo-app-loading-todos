import { ErrorType } from '../../types/ErrorType';

type Props = {
  error: ErrorType | null
  setError: (error: ErrorType | null) => void
};

export const ErrorNotification: React.FC<Props> = ({ error, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {error}
    </div>
  );
};
