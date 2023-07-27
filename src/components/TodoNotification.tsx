import React, { useEffect } from 'react';
import cn from 'classnames';
import { Error } from '../types/Todo';

type Props = {
  hasError: string
  setHasError: (value: Error) => void
};

export const TodoNotification: React.FC<Props> = ({
  hasError,
  setHasError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setHasError(Error.NOTHING);
    }, 3000);
  }, [hasError]);

  return (
    <div
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !hasError,
      })}
    >

      <button
        type="button"
        className="delete"
        onClick={() => {
          setHasError(Error.NOTHING);
        }}
      />

      {/* show only one message at a time */}
      {hasError === Error.ADD && 'Unable to add a todo'}
      <br />
      {hasError === Error.DELETE && 'Unable to delete a todo'}
      <br />
      {hasError === Error.UPDATE && 'Unable to update a todo'}
      <br />
      {hasError === Error.FETCH
        && 'Something went wrong with fetch todos request'}
    </div>
  );
};
