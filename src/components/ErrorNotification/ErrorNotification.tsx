/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  error: ErrorType | null;
  onHideError: () => void;
};

export const ErrorNotification: FC<Props> = ({ error, onHideError }) => {
  const errorMessage = useRef(error);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (error) {
      errorMessage.current = error;
      timerRef.current = setTimeout(() => onHideError(), 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [error, onHideError]);

  return (
    /* eslint-disable-next-line max-len */
    <div className={classNames('notification is-danger is-light has-text-weight-normal', {
      hidden: !error,
    })}
    >
      <button
        type="button"
        className="delete"
        onClick={onHideError}
      />

      {errorMessage.current || error}
    </div>
  );
};
