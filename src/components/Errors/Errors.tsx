import classNames from 'classnames';
import React from 'react';

type Props = {
  setErrors: (value: boolean) => void;
  errors: boolean;
};

export const Errors: React.FC<Props> = ({ setErrors, errors }) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      {
        hidden: errors,
      },
    )}
  >
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setErrors(false)}
    />

    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo
  </div>
);
