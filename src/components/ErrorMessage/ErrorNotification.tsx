/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  onClose: () => void,
};

export const ErrorNotification: React.FC<Props> = ({ onClose }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
