import { FC, useEffect } from 'react';

import { useTimeout } from './useTimeout';
import React = require('react');

export const errors = {
  load: {
    message: 'Unable to load todos',
  },
  add: {
    message: 'Unable to add todo',
  },
  delete: {
    message: 'Unable to delete todo',
  },
  update: {
    message: 'Unable to update todo',
  },
  empty: {
    message: 'Title cannot be empty',
  },
};

export type ErrorType = keyof typeof errors;

type Props = {
  errorType: ErrorType | null;
  handleClosingError: () => void;
};

export const ErrorNotification: FC<Props> = ({
  errorType,
  handleClosingError,
}) => {
  const [startTimeout] = useTimeout(handleClosingError, 3000);

  useEffect(() => {
    startTimeout();
  }, [errorType, startTimeout]);
  const message = errorType ? errors[errorType].message : '';

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${!message ? 'hidden' : ''}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleClosingError}
      />
      {message}
    </div>
  );
};
