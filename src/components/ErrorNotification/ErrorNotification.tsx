import classNames from 'classnames';

type Props = {
  currentError: string | null;
  handleOnHideError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  currentError,
  handleOnHideError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !currentError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleOnHideError}
      />
      {currentError}
    </div>
  );
};
