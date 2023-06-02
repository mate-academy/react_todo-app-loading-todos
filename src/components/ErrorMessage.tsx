/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  handleSetError: (value: boolean) => void
}

export default function ErrorMessage({ handleSetError }: Props) {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={() => handleSetError(false)}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
}
