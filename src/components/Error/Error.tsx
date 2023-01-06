import { useEffect } from 'react';

type Props = {
  error: boolean,
  setError: (arg0: boolean)=>void,
  errorText: string,
};

/* eslint-disable jsx-a11y/control-has-associated-label */
const Error:React.FC<Props> = ({ error, setError, errorText }) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${!error && 'hidden'}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setError(false);
        }}
      />

      {errorText}
    </div>
  );
};

export default Error;
