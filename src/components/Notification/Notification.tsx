import classNames from 'classnames';

type Props = {
  error: boolean;
  deleteError: (value: boolean) => void;
};

export const Notification: React.FC<Props> = ({ error, deleteError }) => {
  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal', {
          hidden: !error,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => deleteError(false)}
        aria-label="delete"
      />
      Can&apos;t create a todo
    </div>
  );
};
