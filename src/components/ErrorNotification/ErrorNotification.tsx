import React, { useEffect, useState } from 'react';

interface Props {
  hideErrorMessage: () => void,
  errorMessage: string | null,
}

export const ErrorNotification: React.FC<Props> = (props) => {
  const { hideErrorMessage, errorMessage } = props;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    setIsVisible(true);

    const timeout = setTimeout(() => {
      hideErrorMessage();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [errorMessage, hideErrorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${isVisible ? '' : 'hidden'}`}
    >
      {errorMessage}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={hideErrorMessage}
        aria-label="Hide Error Message"
      />
    </div>
  );
};
