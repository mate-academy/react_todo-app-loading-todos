import cn from 'classnames';
import { ErrorStatus } from '../../types/ErrorStatus';

type Props = {
  errorMessage: ErrorStatus;
  setErrorMessage: (er: ErrorStatus) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(ErrorStatus.NoError)}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};
