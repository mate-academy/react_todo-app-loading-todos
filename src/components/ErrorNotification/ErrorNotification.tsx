import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useTimeout } from '../../hooks/useTimeout';

export const errors = {
  load: {
    message: 'Unable to load todos',
  },
  add: {
    message: 'Unable to add a todo',
  },
  delete: {
    message: 'Unable to delete a todo',
  },
  update: {
    message: 'Unable to update a todo',
  },
  empty: {
    message: 'Title should not be empty',
  },
};

export type ErrorType = keyof typeof errors;

interface Props {
  errorType: ErrorType | null;
  onClose: () => void;
}

export const ErrorNotification: FC<Props> = ({ errorType, onClose }) => {
  const [startHideTimeout] = useTimeout(onClose, 3000);

  useEffect(() => {
    startHideTimeout();
  }, [errorType, startHideTimeout]);
  const message = errorType ? errors[errorType].message : '';

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light has-text-weight-normal',
        { hidden: !message },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {message}
    </div>
  );
};
