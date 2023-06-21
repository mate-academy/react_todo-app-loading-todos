import { useEffect, useState } from 'react';

interface NotificationsProps {
  removeTodoIsClicked: boolean,
  setRemoveTodoIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
  editTodoIsClicked: boolean,
  setEditTodoIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
  onEmptyFormSubmit: boolean,
  setOnEmptyFormSubmit: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Notifications: React.FC<NotificationsProps> = ({
  removeTodoIsClicked,
  setRemoveTodoIsClicked,
  editTodoIsClicked,
  setEditTodoIsClicked,
  onEmptyFormSubmit,
  setOnEmptyFormSubmit,
}) => {
  const [hideNotificationIsClicked,
    setHideNotificationIsClicked] = useState(false);

  const hideNotification = () => {
    setHideNotificationIsClicked(true);
    setRemoveTodoIsClicked(false);
    setEditTodoIsClicked(false);
    setOnEmptyFormSubmit(false);
  };

  let notificationText = '';

  if (removeTodoIsClicked) {
    notificationText = 'Unable to delete a todo';
  } else if (editTodoIsClicked) {
    notificationText = 'Unable to edit a todo';
  } else if (onEmptyFormSubmit) {
    notificationText = 'Title can\'t be empty';
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
