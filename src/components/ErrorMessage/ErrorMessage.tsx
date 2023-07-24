/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  removeError: () => void;
};

export const ErrorMessage: React.FC<Props> = ({
  removeError,
}) => (
  <div className="notification is-danger is-light has-text-weight-normal">
    <button
      type="button"
      className="delete"
      onClick={removeError}
    />

    {/* show only one message at a time */}
    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo
  </div>
);
