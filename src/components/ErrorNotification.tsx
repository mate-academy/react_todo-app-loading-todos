import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../stores/TodosContext';
import { ErrorMessages } from '../types/ErrorMessages';

export const ErrorNotification: React.FC = () => {
  const {
    errorText,
    showError,
  } = useContext(TodosContext);

  const handleCloseClick = () => showError(ErrorMessages.None);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        's-light',
        'has-text-weight-normal', {
          hidden: !errorText,
        },
      )}
    >
      <button
        aria-label="Hide notification"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleCloseClick}
      />
      {errorText}
    </div>
  );
};
