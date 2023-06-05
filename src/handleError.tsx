/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  handleSetError: (value: boolean) => void
}

export const ErrorMessage: React.FC<Props>
  = ({ handleSetError }) => {
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
  };
