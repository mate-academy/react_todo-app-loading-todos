/* eslint-disable jsx-a11y/control-has-associated-label */
interface TodoNotificationProps {
  message: string;
  onDismiss: () => void;
}

export const TodoNotification: React.FC<TodoNotificationProps> = (
  { message, onDismiss },
) => (
  <div className="notification is-danger is-light has-text-weight-normal">
    <button
      type="button"
      className="delete"
      onClick={onDismiss}
    />

    {/* show only one message at a time */}
    {message}
  </div>
);
