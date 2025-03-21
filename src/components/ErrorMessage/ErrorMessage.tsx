import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';
import { getMessage } from '../../services/errorServices';

type ErrorProps = {
  error: ErrorType;
};

const ErrorMessage: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error.isVisible },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {getMessage(error)}
    </div>
  );
};

export default ErrorMessage;
