import cn from 'classnames';
import { ErrorMessageType } from '../../types/ErrorMessageType';

interface Props {
  errorMessage: ErrorMessageType;
  setErrorMessage: (error: ErrorMessageType) => void;
}

export const ErrorNotification = ({ errorMessage, setErrorMessage }: Props) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        onClick={() => setErrorMessage(ErrorMessageType.NONE)}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        disabled={!errorMessage}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};
