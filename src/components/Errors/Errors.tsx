import * as React from 'react';
import { IsActiveError, ErrorsProps } from '../../types/types';
import classNames from 'classnames';

export const Errors: React.FC<ErrorsProps> = ({ isError, setIsError }) => {
  const errorMessage = () => {
    let message = '';

    switch (isError) {
      case IsActiveError.Add:
        message = 'Unable to add a todo';
        break;
      case IsActiveError.Delete:
        message = 'Unable to delete a todo';
        break;
      case IsActiveError.Empty:
        message = 'Title should not be empty';
        break;
      case IsActiveError.Load:
        message = 'Unable to load todos';
        break;
      case IsActiveError.Update:
        message = 'Unable to update a todo';
        break;
    }

    return message;
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(IsActiveError.NoError);
    }, 3000);

    return () => clearTimeout(timer);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: isError === IsActiveError.NoError,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsError(IsActiveError.NoError)}
      />
      {errorMessage()}
    </div>
  );
};
