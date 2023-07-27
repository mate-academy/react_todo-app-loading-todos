/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  message: string,
  setMessage: (message: string) => void,
};

export const ErrorMessage: React.FC<Props> = ({ message, setMessage }) => {
  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: message === '' },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setMessage('')}
      />
      {message}
    </div>
  );
};

//  Notification is shown in case of any error
//  Add the 'hidden' class to hide the message smoothly
// show only one message at a time
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
