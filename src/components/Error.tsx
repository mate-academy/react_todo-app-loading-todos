type Props = {
  message: string | null;
  onClose: () => void;
};

export const Error: React.FC<Props> = ({ message, onClose }) => {
  if (!message) {
    return null;
  }

  return (
    <div data-cy="ErrorNotification" className="notification is-danger">
      <button data-cy="HideErrorButton" className="delete" onClick={onClose} />
      {message}
    </div>
  );
};
