import classNames from 'classnames';
import React from 'react';

type Props = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorNotification: React.FC<Props> = ({ error, setError }) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: error === '' },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setError('')}
    />
    {error}
    {/* <br />
    Title should not be empty
    <br />
    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo */}
  </div>
);
