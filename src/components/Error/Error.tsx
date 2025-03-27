import classNames from 'classnames';
import { ErrorType } from '../../types/Error';

type Props = {
  errorMessage: ErrorType;
  handleHideError: () => void;
};

export const Error: React.FC<Props> = ({ errorMessage, handleHideError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !errorMessage,
        },
      )}
      hidden={!errorMessage}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleHideError}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};
