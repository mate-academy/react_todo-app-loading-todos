import classNames from 'classnames';

type Props = {
  error: boolean
  closeError: (boolean: boolean) => void
};

export const ErrorNotification: React.FC<Props> = ({ error, closeError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames('notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: !error,
        })}

    >
      <button
        aria-label="press button to delete"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => closeError(false)}
      />

      Wrong url
    </div>
  );
};
