import { ErrorMessage } from '../../types/error';
import cn from 'classnames';

type ErrorNotificationProps = {
  shouldShowError: boolean;
  errorMsg: ErrorMessage;
  hideNotification: () => void;
};

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  shouldShowError,
  errorMsg,
  hideNotification,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !shouldShowError,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={hideNotification}
      />
      {errorMsg}
    </div>
  );
};

export default ErrorNotification;
