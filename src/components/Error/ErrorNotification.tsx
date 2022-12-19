import React, { useEffect, useRef } from 'react';

interface Props {
  errorMessage: string,
  updateError: (newMessage: string) => void,
}

export const ErrorNotification: React.FC<Props> = (props) => {
  const { errorMessage, updateError } = props;
  const timerRef = useRef<NodeJS.Timer>();

  timerRef.current = setTimeout(() => updateError(''), 3000);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        aria-label="delete"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => updateError('')}
      />
      { errorMessage }
      {/* Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
