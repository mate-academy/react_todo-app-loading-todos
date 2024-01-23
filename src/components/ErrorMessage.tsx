import React, { useState, useEffect } from 'react';
import { Error } from '../types/Error';

interface Props {
  error: Error | null;
  close: () => void;
}

export const ErrorMessage: React.FC<Props> = ({ error, close }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      close();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [close]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${isVisible ? 'visible' : 'hidden'}`}
    >
      <button
        aria-label="Close"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setIsVisible(false);
          close();
        }}
      />
      <p>{error}</p>
    </div>
  );
};
