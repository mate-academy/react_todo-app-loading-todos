import React from 'react';
import { TypeErorr } from '../../types/ErorrType';

interface Props {
  erorrType: string | null,
  onRemoveErorrHandler: () => void,
}

const erorrHandler = (erorrType: string | null) => {
  switch (erorrType) {
    case TypeErorr.ADD:
      return 'Unable to add a todo';
    case TypeErorr.DELETE:
      return 'Unable to delete a todo';
    case TypeErorr.UPDATE:
      return 'Unable to update a todo';
    default:
      return 'Erorr';
  }
};

export const Erorr: React.FC<Props> = ({
  erorrType, onRemoveErorrHandler,
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
        onClick={() => onRemoveErorrHandler}
      />

      {erorrHandler(erorrType)}
    </div>
  );
};
