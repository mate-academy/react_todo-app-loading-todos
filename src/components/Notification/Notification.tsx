/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  isError: boolean,
  onIsError: (isError: boolean) => void,
};

export const Notification:React.FC<Props> = ({ isError, onIsError }) => (
  <div className={classNames(
    'notification is-danger is-light has-text-weight-normal',
    { hidden: !isError },
  )}
  >
    <button
      type="button"
      className="delete"
      onClick={() => onIsError(false)}
    />

    {/* show only one message at a time */}
    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo
  </div>
);
