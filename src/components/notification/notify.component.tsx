import React from 'react';

import classNames from 'classnames';
import { notifyTypes } from './notifyTypes';

export const NotifyComponent: React.FC<notifyTypes> = ({
  closeModal,
  errorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        onClick={closeModal}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {errorMessage}
    </div>
  );
};
