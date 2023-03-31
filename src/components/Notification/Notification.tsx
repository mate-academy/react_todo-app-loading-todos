/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

interface Props {
  error: string;
  setHideNotification: (hide: boolean) => void;
  hideNotification: boolean;
}

export const Notification: React.FC<Props> = ({
  error,
  setHideNotification,
  hideNotification,
}) => {
  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: hideNotification },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setHideNotification(true)}
      />
      {error}
    </div>
  );
};
