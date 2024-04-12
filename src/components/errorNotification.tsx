import classNames from 'classnames';

interface ErrorProps {
  errorText: string;
  setErrorText: (errorText: string) => void;
}

export const ErrorNotification: React.FC<ErrorProps> = ({
  errorText,
  setErrorText,
}) => {
  const errorTextClass = classNames({
    notification: true,
    'is-danger': true,
    'is-light': true,
    'has-text-weight-normal': true,
    hidden: errorText === '',
  });

  return (
    <div data-cy="ErrorNotification" className={errorTextClass}>
      <button
        onClick={() => setErrorText('')}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {errorText}
    </div>
  );
};

// Unable to load todos
// Title should not be empty
// Unable to add a todo
// Unable to delete a todo
// Unable to update a todo
