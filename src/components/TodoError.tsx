import { ErrorMessage } from '../utils/ErrorMessage';

interface Props {
  error: string | null;
  setError: (arg0: ErrorMessage) => void,
}

export const TodoError: React.FC<Props> = ({ error, setError }) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        aria-label="Close error"
        onClick={() => setError(ErrorMessage.NoError)}
      />
      {error}
    </div>
  );
};
