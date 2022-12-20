/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

interface Props {
  error: string,
  isHidden: boolean,
  onErrorHidden: (isError: boolean) => void,
}

export const ErrorNotification: React.FC<Props> = ({
  error,
  isHidden,
  onErrorHidden,
}) => {
  const timerRef = useRef<NodeJS.Timer>();

  const handleCrossButtonClick = () => {
    onErrorHidden(true);
  };

  useEffect(() => {
    if (!isHidden) {
      timerRef.current = setTimeout(() => {
        onErrorHidden(true);
      }, 3000);
    } else {
      clearTimeout(timerRef.current);
    }
  }, [isHidden]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isHidden },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleCrossButtonClick}
      />
      {error === 'get'
        ? `Unable to ${error} todos`
        : `Unable to ${error} a todo`}
    </div>
  );
};
