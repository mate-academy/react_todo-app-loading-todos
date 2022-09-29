import classNames from 'classnames';

type Props = {
  error: boolean;
  handleErrorClose: (boolean: boolean) => void;
  errorMessage: string;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  handleErrorClose,
  errorMessage,
}) => {
  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !error,
        },
      )}
      data-cy="ErrorNotification"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => handleErrorClose(false)}
        aria-label="close"
      />
      {errorMessage}
    </div>
  );
};
