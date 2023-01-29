/* eslint-disable curly */
import { useEffect } from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  error: Error | null,
  setIsError: (arg: Error | null) => void,
};

export const ErrorNotification: React.FC<Props> = ({ error, setIsError }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsError(null);
    }, 3000);
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        ('notification is-danger is-light has-text-weight-normal'),
        { hidden: error === null },
      )}
    >
      <button
        aria-label="delete"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsError(null)}
      />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
