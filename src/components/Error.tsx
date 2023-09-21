import { useContext } from 'react';
import { TodosContext } from '../context/TodoContext';

export const Error = () => {
  const { handleCloseError } = useContext(TodosContext);

  const handleButtonClick = () => {
    handleCloseError();
  };

  return (
    // Notification is shown in case of any error
    // Add the 'hidden' class to hide the message smoothly
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        title="errorButton"
        onClick={handleButtonClick}
      />
      {/* show only one message at a time */}
      Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
