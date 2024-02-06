/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { StateContext } from '../Context/StateContext';

export const Notification: React.FC = () => {
  const { notification } = useContext(StateContext);
  const [isNotification, setIsNotification] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsNotification(false), 3000);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isNotification,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsNotification(false)}
      />
      <span>
        {notification}
      </span>
    </div>
  );
};
