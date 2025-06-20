import classNames from 'classnames';

type NotificationProps = {
  isError: boolean;
  errors: string[];
  setIsError: (val: boolean) => void;
};

export const ErrorNotification: React.FC<NotificationProps> = ({
  isError,
  errors,
  setIsError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !isError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setIsError(false);
        }}
      />
      {/* show only one message at a time */}
      {errors.map(error => (
        <>
          {error}
          <br />
        </>
      ))}
    </div>
  );
};
