/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  getErrorStatus: boolean;
  setGetErrorStatus: (boolean: boolean) => void;
}

export const ErrorsComponent: React.FC<Props> = (props) => {
  const {
    getErrorStatus,
    setGetErrorStatus,
  } = props;

  return (
    <div
      hidden={!getErrorStatus}
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setGetErrorStatus(false);
        }}
      />
      <span hidden={!getErrorStatus}>
        Unable to get a todo
      </span>
      <span hidden>
        Unable to add a todo
      </span>
      <span hidden>
        Unable to delete a todo
      </span>
      <span hidden>
        Unable to update a todo
      </span>
    </div>

  );
};
