import classNames from 'classnames';
import React from 'react';

type Props = {
  errorMessage: string;
  isHidden: boolean;
  onClose: (value: boolean) => void;
};

export const Notification: React.FC<Props> = ({
  errorMessage,
  isHidden,
  onClose,
}) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: isHidden },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => onClose(true)}
    />
    {errorMessage}
  </div>
);

// Keep for next tasks
// Unable to load todos
// <br />
// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
