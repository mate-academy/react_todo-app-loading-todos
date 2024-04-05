import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../store/Store';
import { Status } from '../../enums/Status';

{
  /* DON'T use conditional rendering to hide the notification */
}

{
  /* Add the 'hidden' class to hide the message smoothly */
}

export const ErrorNotification = () => {
  const { status } = useContext(StateContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if (status === Status.LOAD_FAILED) {
      setErrorMessage('Unable to load todos');
      setShowPopup(true);
    }

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  }, [status]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !showPopup },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setShowPopup(false)}
      />
      {errorMessage}
    </div>
  );
};
