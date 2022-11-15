import classNames from 'classnames';
import '../../styles/index.scss';

type Props = {
  isError: boolean;
  handleErrorClose: () => void;
};

export const ErrorNotifications: React.FC<Props> = ({
  isError,
  handleErrorClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Hide Error"
        onClick={handleErrorClose}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
