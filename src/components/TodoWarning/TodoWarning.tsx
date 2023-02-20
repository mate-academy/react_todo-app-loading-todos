import React from 'react';
import cn from 'classnames';

interface Props {
  isError: boolean,
  setIsError: (param: boolean) => void
}

export const TodoWarning: React.FC<Props> = ({ isError, setIsError }) => {
  return (
    <div
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !isError },
      )}
    >
      <button
        aria-label="close button"
        type="button"
        className="delete"
        onClick={() => setIsError(false)}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
