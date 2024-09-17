import classNames from 'classnames';

export const ErrorNotification: React.FC<{
  errorMessage: string;
  handleErrorClose: () => void;
}> = ({ errorMessage, handleErrorClose }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleErrorClose}
      />
      {/* show only one message at a time */}
      Unable to load todos
    </div>
  );
};
