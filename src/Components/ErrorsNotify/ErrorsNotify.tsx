import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext/TodoContext';

export const ErrorsNotify = () => {
  const { errorMessage, setErrorMessage } = useContext(TodoContext);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (errorMessage !== '') {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  }, [errorMessage]);

  const closeErrorMessage = () => {
    setShowErrorMessage(false);
    setErrorMessage('');
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !showErrorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={closeErrorMessage}
      />
      {errorMessage}
    </div>
  );
};
