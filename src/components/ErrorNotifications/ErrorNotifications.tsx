import React from 'react';

type Props = {
  currentError: string;
  setCurrentError: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorNotification: React.FC<Props> = (props) => {
  const { currentError, setCurrentError } = props;

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={
          () => setCurrentError('')
        }
      />
      {`Unable to ${currentError} a todo`}
    </div>
  );
};
