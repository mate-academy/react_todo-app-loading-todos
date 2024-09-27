import React, { useEffect } from 'react';
import cn from 'classnames';
import { useTodos } from '../TodosProvider';

export const ErrorNotification: React.FC = () => {
  const { errorMessage, setErrorMessage } = useTodos();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [errorMessage, setErrorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${cn({
        hidden: !errorMessage,
      })}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setErrorMessage('');
        }}
      />
      {errorMessage}
    </div>
  );
};
