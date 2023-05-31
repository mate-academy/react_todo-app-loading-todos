/* eslint-disable jsx-a11y/control-has-associated-label */

import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ErrorProps {
  error:string,
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
  const [message, setMessage] = useState(() => {
    switch (error) {
      case 'add':
        return 'Unable to add a todo';
      case 'delete':
        return 'Unable to delete a todo';
      case 'update':
        return 'Unable to update a todo';
      default:
        return '';
    }
  });

  setTimeout(() => setMessage(''), 3000);

  return (
    <>
      {message
      && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setMessage('')}
          />
          {message}
        </div>
      )}
    </>
  );
};
