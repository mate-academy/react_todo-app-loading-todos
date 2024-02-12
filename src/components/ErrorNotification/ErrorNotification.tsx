/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  errorMessage: Errors | '',
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }

    return undefined;
  }, [errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-light',
        'is-danger',
        'has-text-weight-normal',
        {
          hidden: !isVisible,
        },
      )}
    >
      <button
        id="hideErrorButton"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsVisible(false)}
      />
      {errorMessage}
    </div>
  );
};
