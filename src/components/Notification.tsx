import classNames from 'classnames';
import { Erorrs } from '../types/Erorrs';

type Props = {
  typeError: string | null
  setNotificationError: (notificationError: boolean) => void
  notificationError: boolean;
};

export const Notification: React.FC<Props> = ({
  typeError,
  setNotificationError,
  notificationError,
}) => {
  const { add, remove, update } = Erorrs;

  if (notificationError) {
    setTimeout(() => {
      setNotificationError(false);
    }, 3000);
  }

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !notificationError },
    )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => {
          setNotificationError(false);
        }}
      />
      {(typeError === add) && 'Unable to add a todo'}
      {(typeError === remove) && 'Unable to delete a todo'}
      {(typeError === update) && 'Unable to update a todo'}
    </div>
  );
};
