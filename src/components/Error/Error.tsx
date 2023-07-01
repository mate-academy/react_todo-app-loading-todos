import { useEffect } from 'react';

type Props = {
  isAddError: boolean,
  isDeleteError: boolean,
  isUpdateError: boolean,
  handleCloseError: () => void,
};

export const Error: React.FC<Props> = ({
  isAddError,
  isDeleteError,
  isUpdateError,
  handleCloseError,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseError();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleCloseError]);

  return (
    <div className="notification is-danger is-light has-text-weight-normal">

      {isAddError && (
        <>
          <button
            type="button"
            className="delete"
            aria-label="delete"
            onClick={handleCloseError}
          />
          <p>Unable to add a todo</p>
        </>
      )}

      {isDeleteError && (
        <>
          <button
            type="button"
            className="delete hidden"
            aria-label="delete"
            onClick={handleCloseError}
          />
          <p>Unable to add a todo</p>
        </>
      )}

      {isUpdateError && (
        <>
          <button
            type="button"
            className="delete"
            aria-label="delete"
            onClick={handleCloseError}
          />
          <p>Unable to update a todo</p>
        </>
      )}
    </div>
  );
};
