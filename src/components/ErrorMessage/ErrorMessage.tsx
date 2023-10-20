/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ErrorMessageEnum } from '../../types/ErrorMessageEnum';

interface Props {
  errorMessage: ErrorMessageEnum | '';
}

export const ErrorMessage: React.FC<Props> = memo(({ errorMessage }) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    setIsHidden(!!errorMessage);

    setTimeout(() => setIsHidden(false), 3000);
  }, [errorMessage]);

  return (

    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal', {
          hidden: !isHidden,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsHidden(false)}
      />
      {errorMessage}
    </div>
  );
});
// {/* show only one message at a time */}
// {/* Notification is shown in case of any error */}
// {/* Add the 'hidden' class to hide the message smoothly */}
