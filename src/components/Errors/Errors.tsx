import { ErrorType } from '../../types/ErrorType';

type ErrorsProps = {
  error: ErrorType | null;
  onErrorChange: (error: ErrorType | null) => void;
};

export const Errors: React.FC<ErrorsProps> = ({ error, onErrorChange }) => {
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
        onClick={() => onErrorChange(null)}
      />
      {/* show only one message at a time */}
      {error}
    </div>
  );
};
