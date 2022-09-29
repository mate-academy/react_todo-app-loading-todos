import classNames from 'classnames';

type Props = {
  loadError: boolean,
  setLoadError: (value: boolean) => void,
};

export const ErrorWindow: React.FC<Props> = ({ loadError, setLoadError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !loadError,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setLoadError(false)}
        aria-label="Close window"
      />

      Unable to load todos
    </div>
  );
};
