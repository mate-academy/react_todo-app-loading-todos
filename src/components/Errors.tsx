/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React from 'react';

type Props = {
  errorMessage:string;
  setIsError:() => void;
  isHidden:boolean;
};

export const Errors:React.FC<Props> = ({
  errorMessage,
  setIsError,
  isHidden,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isHidden },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={setIsError}
      />
      {errorMessage}
    </div>
  );
};
