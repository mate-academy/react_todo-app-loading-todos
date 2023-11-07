/* eslint-disable jsx-a11y/control-has-associated-label */

export const ErrorField: React.FC = () => (
  <div
    data-cy="ErrorNotification"
    className="notification is-danger is-light has-text-weight-normal"
  >
    {/* Notification is shown in case of any error */}
    {/* Add the 'hidden' class to hide the message smoothly */}
    <button data-cy="HideErrorButton" type="button" className="delete" />
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
