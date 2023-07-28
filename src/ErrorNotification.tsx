/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { TodoContext } from './context/todoContext';

export const ErrorNotification: React.FC = () => {
  const { error, onErrorHide } = useContext(TodoContext);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        onErrorHide(null);
      }, 3000);
    }
  }, [error]);

  return (
    <>
      {error && (
        <div
          className={classNames(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !error },
          )}
        >
          {error}
          <button
            type="button"
            className="delete"
            onClick={() => {
              onErrorHide(null);
            }}
          />
        </div>
      )}
    </>
  );
};
