import React, { useEffect } from 'react';

type Props = {
  error: string,
  isHiddenClass: boolean,
  setIsHiddenClass: (val: boolean) => void,
  // setError: (value: string) => void,
};

function useAutoHideError(timeout: number, setClass: (value: boolean) => void) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setClass(true);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [setClass, timeout]);
}

export const Error: React
  .FC<Props> = ({ error, isHiddenClass, setIsHiddenClass }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsHiddenClass(true);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  useAutoHideError(3000, setIsHiddenClass);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${isHiddenClass && 'hidden'}`}
    >
      {/* eslint-disable jsx-a11y/control-has-associated-label  */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setIsHiddenClass(true);
        }}
      />
      {/* show only one message at a time */}
      {error}
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
