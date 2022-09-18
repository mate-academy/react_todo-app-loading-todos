import classNames from 'classnames';

type Props = {
  loadNotification: boolean;
  closeNotification: () => void;
};

export const Notification: React.FC<Props> = (
  {
    loadNotification,
    closeNotification,
  },
) => {
  return (
    <>
      {loadNotification && (
        <div
          data-cy="ErrorNotification"
          className={classNames(
            'notification is-danger is-light has-text-weight-normal',
            {
              hidden: !loadNotification,
            },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            aria-label="HideErrorButton"
            onClick={() => closeNotification()}
          />

          Unable to load a todo
        </div>
      )}
    </>
  );
};
