import classNames from 'classnames';

type Props = {
  errorMessage: string;
  setErrorMessage: (v: string) => void;
};

export const ErrorNotification = ({ errorMessage, setErrorMessage }: Props) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames([
        'notification',
        'is-danger',
        'is-light',
        ' has-text-weight-normal',
        {
          hidden: !errorMessage,
        },
      ])}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {/* show only one message at a time */}
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
