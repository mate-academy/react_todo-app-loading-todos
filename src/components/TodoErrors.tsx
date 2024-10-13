import classNames from 'classnames';

type Props = {
  errorMessage: string;
  closeError: (emptyString: string) => void;
};

export const TodoErrors: React.FC<Props> = ({
  errorMessage,
  closeError = () => {},
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => closeError('')}
      />
      {errorMessage}
      {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
