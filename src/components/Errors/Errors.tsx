import { ErrorSpec } from '../../types/ErrorSpec';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

type Props = {
  error: ErrorSpec | null;
};

export const Errors: React.FC<Props> = ({ error }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="none"
      />

      <ErrorMessage error={error} />
    </div>
  );
};
