/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
  closeError: () => void;
};

const Notification:React.FC<Props> = ({ errorMessage, closeError }) => {
  useEffect(() => {
    setTimeout(() => {
      closeError();
    }, 3000);
  }, []);

  return (
    <>
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={closeError}
          aria-label="Close error message"
        />
        {errorMessage}
      </div>
    </>
  );
};

export default Notification;
