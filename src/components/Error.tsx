/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  message: string;
  whenClose: () => void;
};

export const Error: React.FC<Props> = ({ message, whenClose }) => {
  useEffect(() => {
    if (message) {
      setTimeout(() => whenClose, 3000);
    }
  }, [message]);

  return (
    <div className={
      classNames('notification is-danger is-light has-text-weight-normal',
        {
          hidden: message.length !== 0,
        })
    }
    >
      <button
        type="button"
        className="delete"
        onClick={whenClose}
      />
      {message}
    </div>
  );
};
