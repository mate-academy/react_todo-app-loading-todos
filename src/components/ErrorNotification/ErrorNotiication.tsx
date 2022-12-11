/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

interface Props {
  error: string,
  isHidden: boolean,
  setError: (isError: boolean) => void,
}

export const ErrorNotification: React.FC<Props> = ({
  error,
  isHidden,
  setError,
}) => {
  const timerRef = useRef<NodeJS.Timer>();

  const handleCrossButtonClick = () => {
    setError(true);
  };

  useEffect(() => {
    console.log('inside effect - ', timerRef.current);
    if (!isHidden) {
      timerRef.current = setTimeout(() => {
        setError(true);
      }, 3000);

      console.log('inside if - ', timerRef.current);
    } else {
      clearTimeout(timerRef.current);

      console.log('inside else - ', timerRef.current);
    }

    console.log('hidden', isHidden);
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

      {`Unable to ${error} a todo`}
      {/* <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
