import cn from 'classnames';

type Props = {
  isNotificationHidden: boolean;
  valueError: string;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  isNotificationHidden,
  valueError,
  onClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: isNotificationHidden },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {valueError}
    </div>
  );
};
