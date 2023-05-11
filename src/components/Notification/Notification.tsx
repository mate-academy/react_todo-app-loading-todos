import { FC } from 'react';

interface Props {
  errorMessage: string
}

export const Notification: FC<Props> = ({ errorMessage }) => {
  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" className="delete" />

      {/* show only one message at a time */}
      {/* Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
      {errorMessage}
    </div>
  );
};
