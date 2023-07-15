import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  errorString: string;
};

export const ErrorMesage: React.FC<Props> = ({
  errorString
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const error = `Unable to ${errorString} a todo`;

  const removeNotification = () => {
    window.setTimeout(() => {
      setIsHidden(true);
    }, 3000);
  };

  const handleHideNotification = () => {
    setIsHidden(true);
  }

  useEffect(() => {
    setIsHidden(false);
    removeNotification();
  }, []);

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal', {
        hidden: isHidden,
      }
    )}
    >
      <button 
        type="button" 
        className="delete"
        aria-label="saveButton"
        onClick={handleHideNotification}
      />
      {error}
    </div>
  );
};
