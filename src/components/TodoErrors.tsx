/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

interface Error {
  error: string,
  setError: (newError: string) => void,
}

export const TodoErrors: React.FC<Error> = ({
  error,
  setError,
}) => {
  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal', {
          hidden: !error,
        },
      )}
    >

      <button
        type="button"
        className="delete"
        onClick={() => setError('')}
      />

      {error}
    </div>
  );
};
