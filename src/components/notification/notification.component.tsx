import React from 'react';
import { NotificationTypes } from './notification.types';
import classNames from 'classnames';

export const NotificationComponent: React.FC<NotificationTypes> = ({
  closeModal,
  errorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <button
        onClick={closeModal}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {/* show only one message at a time */}
      {errorMessage}
      {/*<br />*/}
      {/*{text.titleShouldNotBeEmpty}*/}
      {/*<br />*/}
      {/*{text.unableToAddTodo}*/}
      {/*<br />*/}
      {/*{text.unableToDeleteTodo}*/}
      {/*<br />*/}
      {/*{text.unableToUpdateTodo}*/}
    </div>
  );
};
