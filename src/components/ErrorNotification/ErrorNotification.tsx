import classNames from 'classnames';

type Props = {
  currentError: string | null;
};

export const ErrorNotification: React.FC<Props> = ({ currentError }) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      {
        hidden: currentError === null,
      },
    )}
  >
    <button data-cy="HideErrorButton" type="button" className="delete" />
    {/* show only one message at a time */}
    {currentError === null || 'Unable to load todos'}
    <br />
    {/* Title should not be empty */}
    <br />
    {/* Unable to add a todo */}
    <br />
    {/* Unable to delete a todo */}
    <br />
    {/* Unable to update a todo */}
  </div>
);
