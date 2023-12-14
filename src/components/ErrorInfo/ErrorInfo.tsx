import cn from 'classnames';
import { ErrorType } from '../../types/ErrorType';

interface Props {
  errorMessage: ErrorType | null,
  setErrorMessage: (error: ErrorType | null) => void;
}

export const ErrorInfo: React.FC<Props> = (props: Props) => {
  const { errorMessage, setErrorMessage } = props;

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: errorMessage === null,
      })}
    >

      <button
        aria-label="Hide Notification"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(null)}
      />
      {errorMessage}
    </div>
  );
};
