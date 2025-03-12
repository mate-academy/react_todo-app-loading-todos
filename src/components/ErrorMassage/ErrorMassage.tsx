import React from 'react';

type Props = {
  errorMassage: string;
  hideError: () => void;
};

export const ErrorMassage: React.FC<Props> = ({ errorMassage, hideError }) => {
  {
    /* DON'T use conditional rendering to hide the notification */
  }

  {
    /* Add the 'hidden' class to hide the message smoothly */
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${errorMassage.length > 0 ? '' : 'hidden'}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => hideError()}
      />
      {/* show only one message at a time */}
      {errorMassage}
      {/* Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
