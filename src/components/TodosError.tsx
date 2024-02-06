import { useState } from 'react';
import cn from 'classnames';
import { useTodo } from '../providers/AppProvider';
import { getError } from '../utils/error';

export const TodosError = () => {
  const { errorTitle } = useTodo();
  const [hidden, setHidden] = useState(false);

  setTimeout(() => {
    setHidden(true);
  }, 3000);

  return (
    /* Notification is shown in case of any error */
    /* Add the 'hidden' class to hide the message smoothly */
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden,
      })}
    >
      {/* eslint-disable-next-line */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setHidden(true)}
      />
      {/* show only one message at a time */}
      {getError(errorTitle)}
    </div>
  );
};
