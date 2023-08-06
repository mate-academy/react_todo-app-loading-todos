/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Error } from '../types/Error';

type Props = {
  error: Error;
  onErrorChange: (error: Error) => void;
};

export const TodoError: React.FC<Props> = ({ error, onErrorChange }) => {
  const timeRef = useRef(0);

  useEffect(() => {
    window.clearTimeout(timeRef.current);

    if (error) {
      timeRef.current = window.setTimeout(() => {
        onErrorChange(Error.None);
      }, 3000);
    }
  }, [error]);

  return (
    <div className={classNames('notification',
      'is-danger', 'is-light', 'has-text-weight-normal', {
        hidden: error === Error.None,
      })}
    >
      <button
        type="button"
        className="delete"
        onClick={() => onErrorChange(Error.None)}
      />
      {error}
    </div>
  );
};
