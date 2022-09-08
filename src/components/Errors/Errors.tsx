import classNames from 'classnames';

type Props = {
  loadError: boolean;
  closeError: () => void;
};

export const Errors: React.FC<Props> = ({ loadError, closeError }) => {
  return (
    <>
      {loadError && (
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
            aria-label="HideErrorButton"
            onClick={() => closeError()}
          />

          Unable to load a todo
        </div>
      )}
    </>
  );
};
