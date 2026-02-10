import { useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  posts: Todo[];
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ErrorNotification: React.FC<Props> = ({
  setErrorMessage,
  errorMessage,
  setLoading,
}) => {
  const hideErrorTimer = useRef<number | null>(null);

  hideErrorTimer.current = window.setTimeout(() => setErrorMessage(''), 3000);

  useEffect(() => {
    const delayTimer = setTimeout(() => setLoading(true), 500);

    return () => {
      clearTimeout(delayTimer);
      if (hideErrorTimer.current) {
        clearTimeout(hideErrorTimer.current);
      }
    };
  }, [setLoading]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        onClick={() => setErrorMessage('')}
        className="delete"
      />
      <div
        className={`notification is-danger is-light has-text-weight-normal ${errorMessage ? '' : 'hidden'}`}
      >
        {errorMessage}
      </div>
    </div>
  );
};
