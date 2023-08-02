import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorText } from '../../types/ErrorText';

type Props = {
  fieldOperation: ErrorText,
  onSetFieldOperation: (text: ErrorText) => void,
};

export const Notifications: React.FC<Props> = ({
  fieldOperation, onSetFieldOperation,
}) => {
  const handlerDeleteError = () => onSetFieldOperation(ErrorText.Empty);

  useEffect(() => {
    const timerID = setTimeout(handlerDeleteError, 3000);

    return () => clearTimeout(timerID);
  }, []);

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !fieldOperation.length },
    )}
    >
      {`Unable to ${fieldOperation} a todo`}

      <button
        aria-label="Delate-Error-Message"
        type="button"
        className="delete"
        onClick={handlerDeleteError}
      />
    </div>
  );
};
