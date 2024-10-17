import React, { useEffect } from 'react';
import cn from 'classnames';

import { TypeError } from '../../types/TypeError';

type Props = {
  errorMessage: TypeError;
  setErrorMessage: React.Dispatch<React.SetStateAction<TypeError>>;
};

export const Error: React.FC<Props> = ({ errorMessage, setErrorMessage }) => {
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(TypeError.DEFAULT), 3000);
    }
  }, [errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(TypeError.DEFAULT)}
      />
      {errorMessage}
    </div>
  );
};
