import { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  isError: boolean;
  setIsError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ isError, setIsError }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsError();
    }, 3000);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={
        classNames('notification is-danger is-light has-text-weight-normal',
          { hidden: !isError })
      }
    >
      <button
        data-cy="HideErrorButton"
        aria-label="delete"
        type="button"
        className="delete"
        onClick={setIsError}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
