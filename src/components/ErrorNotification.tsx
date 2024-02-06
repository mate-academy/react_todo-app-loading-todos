import React, { useContext, useEffect, useState } from 'react';
import { ErrorContext } from '../providers/TodosProvider';

type Props = {};

export const ErrorNotification: React.FC<Props> = () => {
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null;

    if (errorMessage) {
      setIsVisible(true);
      timerId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [errorMessage, setErrorMessage]);

  useEffect(() => {
    return () => {
      setIsVisible(false);
    };
  }, []);

  // if (!isVisible) {
  //   return null;
  // }

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${isVisible ? '' : 'hidden'}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Hide error message"
        onClick={() => setIsVisible(false)}
      />
      {errorMessage}
      {/* show only one message at a time */}
      {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
