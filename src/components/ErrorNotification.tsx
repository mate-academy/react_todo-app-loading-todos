import { ErrorMessage } from '../types/ErrorMessage';

interface ErrorProps {
  message: ErrorMessage | '';
  onClear: () => void;
}

export const ErrorNotification: React.FC<ErrorProps> = ({
  message,
  onClear,
}) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${message ? '' : 'hidden'}`}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onClear}
    />
    {message}
  </div>
);
