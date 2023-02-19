import React, { Dispatch, SetStateAction } from 'react';
import { Error } from '../types/Error';

type Props = {
  error: Error,
  onDeleteClick: Dispatch<SetStateAction<Error>>
};

export const ErrorMessage: React.FC<Props> = ({ error, onDeleteClick }) => {
  const handleDeleteErrorClick = () => {
    onDeleteClick(Error.NONE);
  };

  const errorText = () => {
    switch (error) {
      case Error.FETCH:
        return 'Unable to show todos';
      case Error.ADD:
        return 'Unable to add a todo';
      case Error.DELETE:
        return 'Unable to delete a todo';
      case Error.CHANGE:
        return 'Unable to update a todo';
      default:
        return '';
    }
  };

  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
    >
      <>{errorText()}</>
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="delete"
        onClick={handleDeleteErrorClick}
      />
    </div>
  );
};
