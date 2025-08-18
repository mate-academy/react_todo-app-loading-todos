import classNames from 'classnames';
import React from 'react';

type Props = {
  errorMsg: string;
  onClose: (msg: string) => void;
};

export const ErrorNotification: React.FC<Props> = ({ errorMsg, onClose }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !errorMsg,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onClose('')}
      />
      {errorMsg}
      {/* show only one message at a time */}
      {/* Unable to load todos +
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
