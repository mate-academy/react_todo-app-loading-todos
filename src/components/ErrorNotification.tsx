import React from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../types/ErrorMessage';

type Props = {
  errorMsg: ErrorMessage;
  onHide: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ errorMsg, onHide }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMsg },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onHide}
      />
      {errorMsg}
    </div>
  );
};
