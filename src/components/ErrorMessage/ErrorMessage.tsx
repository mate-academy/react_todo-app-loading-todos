import React from 'react';
import { ApiError } from '../../types/ApiError';

interface Props {
  errorType: ApiError;
}

export const ErrorMessage: React.FC<Props> = ({ errorType }) => {
  let message = '';

  switch (errorType) {
    case ApiError.Get:
      message = 'Unable to load todos';
      break;
    case ApiError.Post:
      message = 'Unable to add todo';
      break;
    case ApiError.Patch:
      message = 'Unable to update a todo';
      break;
    case ApiError.Delete:
      message = 'Unable to delete a todo';
      break;
    default:
      message = 'Something goes wrong';
  }

  return (
    <div
      className="
        notification
        is-danger
        is-light
        has-text-weight-normal"
    >
      <button
        type="button"
        className="delete"
        aria-label={' '}
      />
      {message}
    </div>
  );
};
