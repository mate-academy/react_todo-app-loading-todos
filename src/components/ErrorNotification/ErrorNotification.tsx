import classNames from 'classnames';

type Props = {
  error: boolean,
  SetError: (value: boolean) => void,
};
export const Notification: React.FC<Props> = ({ error, SetError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification', 'is-danger', 'is-light', 'has-text-weight-normal',
        { hidden: error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="error"
        onClick={() => SetError(true)}
      />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
