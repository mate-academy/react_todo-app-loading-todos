import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { Error } from '../types/Error';

type Props = {
  isError: Error | null;
  setIsError: Dispatch<SetStateAction<Error | null>>;
};

export const ErrorNotifications: React.FC<Props> = ({
  isError,
  setIsError,
}) => {
  const errors = {
    [Error.Load]: 'Unable to load todos',
    [Error.Add]: 'Unable to add a todo',
    [Error.Delete]: 'Unable to delete a todo',
    [Error.Update]: 'Unable to update a todo',
  };

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !isError },
    )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => setIsError(null)}
      />

      {isError && errors[isError]}
    </div>
  );
};
