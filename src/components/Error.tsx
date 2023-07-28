/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';

type Props = {
  errorType: string,
  setErrorType: (x: string) => void,
};
export const Error: FC<Props> = ({ errorType, setErrorType }) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={() => setErrorType('')}
      />

      {/* show only one message at a time */}
      {errorType
        && `Unable to ${errorType} a todo`}
      <br />
      {/* Unable to delete a todo */}
      {/* <br /> */}
      {/* Unable to update a todo */}
    </div>
  );
};
