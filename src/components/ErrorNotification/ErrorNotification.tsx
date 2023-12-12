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
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      >
        {' '}
      </button>
      {error}
    </div>
  );
};
