import cn from 'classnames';
import React from 'react';

type Props = {
  message: string,
  hidden: boolean,
  setHidden: () => void,
};

export const Notification: React.FC<Props> = ({
  message,
  hidden,
  setHidden,
}) => {
  return (
    <>
      { message.length !== 0 && (
        <div
          className={cn(
            'notification is-danger is-light has-text-weight-normal',
            { hidden },
          )}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            onClick={setHidden}
          />
          {message}

          {/* show only one message at a time */}
          {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
        </div>
      )}
    </>
  );
};
