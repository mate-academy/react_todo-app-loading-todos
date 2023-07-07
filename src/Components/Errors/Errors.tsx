import classNames from 'classnames';
import { SetStateAction, useEffect } from 'react';

interface Props {
  isError: boolean;
  setError: React.Dispatch<SetStateAction<boolean>>;
}

export const Errors: React.FC<Props> = ({ isError, setError }) => {
  useEffect(() => {
    if (!isError) {
      const timer = setTimeout(() => {
        setError(false);
        clearTimeout(timer);
      }, 3000);
    }
  }, [isError]);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isError },
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="button delete"
        onClick={() => setError(true)}
      />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
