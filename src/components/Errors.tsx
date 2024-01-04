import { Dispatch, SetStateAction } from 'react';

interface Props {
  isErrorsClosed: boolean,
  setIsErrorsClosed: Dispatch<SetStateAction<boolean>>
}

export const Errors: React.FC<Props> = ({
  isErrorsClosed,
  setIsErrorsClosed,
}) => {
  const handleCloseErrors = () => {
    setIsErrorsClosed(true);
  };

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        aria-label="hide error button"
        className={`delete ${isErrorsClosed && 'hidden'}`}
        onClick={handleCloseErrors}
      />

      {/* show only one message at a time */}
      Unable to load todos
      <br />
    </div>
  );
};
