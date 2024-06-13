import classNames from 'classnames';

type Props = {
  error: string;
};

export const TodoErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      <p>{error}</p>
    </div>
  );
};
