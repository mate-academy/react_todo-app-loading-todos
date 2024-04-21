import React, { useContext } from 'react';
import { TodosContext } from '../../TodosContext';

export const Error: React.FC = () => {
  const { errorMessage } = useContext(TodosContext);

  return (
    errorMessage && (
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorMessage}
        <br />
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
    )
  );
};
