import React from 'react';
import { TypeError } from '../../types/ErorrType';

interface Props {
  errorType: string | null,
  onRemoveErrorHandler: () => void,
}

const erorrHandler = (errorType: string | null) => {
  switch (errorType) {
    case TypeError.ADD:
      return 'Unable to add a todo';
    case TypeError.DELETE:
      return 'Unable to delete a todo';
    case TypeError.UPDATE:
      return 'Unable to update a todo';
    default:
      return 'Erorr';
  }
};

export const Erorr: React.FC<Props> = ({
  errorType, onRemoveErrorHandler,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        aria-label="Delete"
        className="delete"
        onClick={() => onRemoveErrorHandler}
      />

      {erorrHandler(errorType)}
    </div>
  );
};
