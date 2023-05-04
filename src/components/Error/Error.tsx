import React, { useEffect } from 'react';
import { ErrorType } from '../../utils/Enums/ErrorType';

interface Props {
  error: ErrorType;
  setError: (error: ErrorType) => void;
}

export const Error: React.FC<Props>
  = ({ error, setError }) => {
    useEffect(() => {
      setTimeout(() => {
        setError(ErrorType.INITIAL);
      }, 3000);
    }, [error, setError]);

    return (
      <>
        <button
          type="button"
          className="delete"
          aria-label="Delete"
          onClick={() => setError(ErrorType.INITIAL)}
        />
        {error}
      </>
    );
  };
