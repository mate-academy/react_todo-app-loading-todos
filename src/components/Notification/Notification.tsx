/* Notification is shown in case of any error */
/* Add the 'hidden' class to hide the message smoothly */

export const Notification = () => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      {/* <button type="button" className="delete" /> */}
      {/* show only one message at a time */}
      Unable to add a todo
      {/* <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
