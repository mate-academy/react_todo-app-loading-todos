import React, { memo, useEffect } from 'react';
import cn from 'classnames';

type FilterProps = {
  errorMessage: string;
  handleOnChangeErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const Errors: React.FC<FilterProps> = memo(({
  errorMessage,
  handleOnChangeErrorMessage,
}) => {
  useEffect(() => {
    setTimeout(() => handleOnChangeErrorMessage(''), 3000);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      {/* eslint-disable-next-line */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => handleOnChangeErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
});
