import classNames from 'classnames';

type Props = {
  removeError: () => void;
  error: boolean;
};

export const ErrorMessage: React.FC<Props> = ({
  removeError,
  error,
}) => (
  <div
    className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !error },
    )}
  >
    <button
      type="button"
      className="delete"
      onClick={removeError}
      aria-label="removeError"
    />
    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo
  </div>
);
