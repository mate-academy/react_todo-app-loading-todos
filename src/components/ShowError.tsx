/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  hiddenError: boolean,
  setHiddenError: React.Dispatch<React.SetStateAction<boolean>>,
};

export const ShowError: React.FC<Props> = ({ hiddenError, setHiddenError }) => {
  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
      hidden={hiddenError}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setHiddenError(true)}
      />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
