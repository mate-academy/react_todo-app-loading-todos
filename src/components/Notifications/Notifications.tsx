import cn from 'classnames';

type NotificationProps = {
  error: string;
  onErrorClean: (error: string) => void;
};

export const Notification: React.FC<NotificationProps> = ({
  error,
  onErrorClean,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onErrorClean('')}
      />
      {error}
    </div>
  );
};
