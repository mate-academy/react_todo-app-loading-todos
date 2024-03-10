/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import classNames from 'classnames';
import { Errors } from '../types/Errors';

type Props = {
  errorText: Errors | null;
  addErrorText: (errorMessage: Errors | null) => void;
};

export const TodoError: React.FC<Props> = ({ errorText, addErrorText }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorText },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => addErrorText(null)}
      />
      {/* show only one message at a time */}
      {errorText}
      {/* Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
    </div>
  );
};
