/* eslint-disable jsx-a11y/control-has-associated-label */

import { memo } from 'react';

interface Props {
  message: string,
}

export const ErrorNotification: React.FC<Props> = memo(() => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
});
