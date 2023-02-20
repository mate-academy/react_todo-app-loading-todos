import React from 'react';

type Props = {
  hideNotifications: () => void;
};

export const Notification:React.FC<Props> = ({ hideNotifications }) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        aria-label="close notification"
        type="button"
        className="delete"
        onClick={() => hideNotifications()}
      />

      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
