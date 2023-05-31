import React from 'react';
import classNames from 'classnames';

type Props = {
  setHideErrorBtn: (hide: boolean) => void;
  hideError: boolean
};

export const Notification: React.FC<Props> = React.memo(({
  setHideErrorBtn,
  hideError,
}) => {
  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !hideError },
    )}
    >

      {/* <label htmlFor="delete">{}</label> */}
      <button
        type="button"
        className="delete hidden"
        id="delete"
        onClick={() => setHideErrorBtn(false)}
      >
        Delete
      </button>

      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
});
