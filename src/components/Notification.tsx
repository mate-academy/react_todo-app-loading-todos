/* eslint-disable jsx-a11y/control-has-associated-label */
import { Action } from '../types/Action';

interface NotificationProps {
  error: boolean
  action: Action
}

export const Notification = ({ error, action }: NotificationProps) => {
  let errorMessage;

  switch (action) {
    case 'add':
      errorMessage = 'Unable to add a todo';
      break;
    case 'delete':
      errorMessage = 'Unable to delete a todo';
      break;
    case 'update':
      errorMessage = 'Unable to update a todo';
      break;
    default:
      break;
  }

  const className = `notification is-danger is-light has-text-weight-normal' ${error ? '' : 'hidden'}`;

  return (
    <div className={className}>
      <button type="button" className="delete" />
      {errorMessage}
      <br />
    </div>
  );
};
