import { TodoError } from '../types/TodoError';

type Props = {
  errorMessage: TodoError,
  onClose: (errorMessage: TodoError) => void,
};

export const TodoErrors: React.FC<Props> = ({
  errorMessage, onClose,
}) => {
  const handleCloseError = () => {
    onClose(TodoError.none);
  };

  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="delete"
        onClick={handleCloseError}
      />

      {errorMessage}

    </div>
  );
};
