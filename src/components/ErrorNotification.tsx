type Props = {
  errorMessage: string;
  onClose: () => void;
};

export default function ErrorNotification({ errorMessage, onClose }: Props) {
  return (
    <div
      data-cy="ErrorNotification"
      className={
        errorMessage.length === 0
          ? 'notification hidden'
          : 'notification is-danger is-light has-text-weight-normal'
      }
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
}
