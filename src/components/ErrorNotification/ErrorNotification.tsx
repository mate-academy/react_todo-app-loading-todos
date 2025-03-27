// DON'T use conditional rendering to hide the notification

import classNames from 'classnames';
import { FC } from 'react';

// Add the 'hidden' class to hide the message smoothly
interface Props {
  message: string;
  onCloseNotification: (message: string) => void;
}
export const ErrorNotification: FC<Props> = ({
  message,
  onCloseNotification,
}: Props) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !message },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => onCloseNotification('')}
    />
    {/* show only one message at a time*/}
    {/* Unable to load todos
    <br />
    Title should not be empty
    <br />
    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo */}
    {message}
  </div>
);
