import classnames from 'classnames';

type Props = {
  error: boolean;
  handleErrorChange: (bool: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  handleErrorChange,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classnames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        aria-label="HideErrorButton"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => handleErrorChange(false)}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
