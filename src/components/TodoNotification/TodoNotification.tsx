import classNames from 'classnames';

type Props = {
  handleCloseButton: () => void,
  hasError: boolean,
};

export const TodoNotification: React.FC<Props> = ({
  handleCloseButton,
  hasError,
}) => {
  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !hasError },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => handleCloseButton()}
      />

      <span>Failed to conntect to the server</span>
    </div>
  );
};
