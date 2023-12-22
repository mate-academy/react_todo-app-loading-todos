import { useTodos } from '../../context/todoProvider';

export const TodoErr = () => {
  const { error } = useTodos();

  return (
  // Notification is shown in case of any error
  // Add the 'hidden' class to hide the message smoothly
    <>
      {error
      && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          {/* <button data-cy="HideErrorButton" type="button" className="delete" /> */}
          {/* show only one message at a time */}
          {`"${error}"`}
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
      )}
    </>
  );
};
