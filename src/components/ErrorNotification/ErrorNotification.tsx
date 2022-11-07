/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';

type Props = {
  hasError: boolean;
  handleErrorClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  hasError,
  handleErrorClose,
}) => (
  <div
    data-cy="ErrorNotification"
    className={cn(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !hasError },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={handleErrorClose}
    />

    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo
  </div>
);
