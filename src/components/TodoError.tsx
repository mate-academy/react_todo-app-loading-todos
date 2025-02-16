import React, { useEffect } from 'react';

interface TodoErrorProp {
  setError: (error: string | null) => void;
  error: string | null;
  className?: string;
  setErrorMessange: (visible: boolean) => void;
}

export const TodoError: React.FC<TodoErrorProp> = ({
  setError,
  error,
  className,
  setErrorMessange,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessange(false);
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, setError, setErrorMessange]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${className}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setErrorMessange(false);
          setError(null);
        }}
      />
      {error}
    </div>
  );
};
