import classNames from 'classnames';
import React from 'react';
import { ErrorMessages } from '../../types/Todo';

interface Props {
  message: ErrorMessages | null;
  show: boolean;
  setShow: (value: boolean) => void;
}

export const ErrorMessage: React.FC<Props> = ({ message, show, setShow }) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !show },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => {
        setShow(false);
      }}
    />
    {/* show only one message at a time */}
    {message}
    {/* <br /> */}
    {/* Title should not be empty
  <br />
  Unable to add a todo
  <br />
  Unable to delete a todo
  <br />
  Unable to update a todo */}
  </div>
);
