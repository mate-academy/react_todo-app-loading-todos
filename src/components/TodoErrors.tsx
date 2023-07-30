/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect } from 'react';

type Props = {
  error: string,
  setError: (value: string) => void,
};

const getErrorMessage = (error: string): string => {
  switch (error) {
    case 'add':
      return 'Unable to add a todo';
    case 'delete':
      return 'Unable to delete a todo';
    case 'update':
      return 'Unable to update a todo';
    default:
      return 'Error';
  }
};

export const TodoErrors: React.FC<Props> = (
  {
    error,
    setError,
  },
) => {
  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error, setError]);

  const errorMessage = getErrorMessage(error);

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !error },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      {errorMessage}
    </div>
  );
};
