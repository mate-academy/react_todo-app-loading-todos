import { useEffect, useState } from 'react';

interface NotificationsProps {
  removeTodoIsClicked: boolean,
  setRemoveTodoIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
  addTodoIsClicked: boolean,
  editTodoIsClicked: boolean,
  setEditTodoIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
  setAddTodoIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Notifications: React.FC<NotificationsProps> = ({
  removeTodoIsClicked,
  setRemoveTodoIsClicked,
  addTodoIsClicked,
  editTodoIsClicked,
  setEditTodoIsClicked,
  setAddTodoIsClicked,
}) => {
  const [hideNotificationIsClicked,
    setHideNotificationIsClicked] = useState(false);

  const hideNotification = () => {
    setHideNotificationIsClicked(true);
    setRemoveTodoIsClicked(false);
    setAddTodoIsClicked(false);
    setEditTodoIsClicked(false);
  };

  let notificationText = '';

  if (removeTodoIsClicked) {
    notificationText = 'Unable to delete a todo';
  } else if (addTodoIsClicked) {
    notificationText = 'Unable to add a todo';
  } else if (editTodoIsClicked) {
    notificationText = 'Unable to edit a todo';
  }

  useEffect(() => {
    if (!hideNotificationIsClicked) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [hideNotificationIsClicked]);

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={hideNotification}
        aria-label="Hide Notification"
      />
      <span>{notificationText}</span>
    </div>
  );
};
