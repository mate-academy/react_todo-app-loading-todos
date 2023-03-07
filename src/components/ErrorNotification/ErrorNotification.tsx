import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  error: Error,
  onDelete: Dispatch<SetStateAction<Error>>,
};

export const ErrorNotification: React.FC<Props> = ({ error, onDelete }) => {
  const handleDeleteErrorClick = () => {
    onDelete(Error.NONE);
  };

  const errorText = () => {
    switch (error) {
      case Error.FETCH:
        return 'Unable to show todos';
      case Error.ADD:
        return 'Unable to add todos';
      case Error.CHANGE:
        return 'Unable to update todos';
      case Error.DELETE:
        return 'Unable to delete todos';
      default:
        return '';
    }
  };

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: error === Error.NONE },
      )}
    >
      <>{errorText()}</>
      <button
        type="button"
        className="delete"
        aria-label="An error message"
        onClick={handleDeleteErrorClick}
      />
    </div>
  );
};
