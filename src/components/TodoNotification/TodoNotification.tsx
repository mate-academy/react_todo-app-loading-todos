import classnames from 'classnames';
import { useState } from 'react';

type Props = {
  errorMessage: string;
};

export const TodoNotification: React.FC<Props> = ({ errorMessage }) => {
  const [isErrorHidden, setIsErrorHidden] = useState(true);

  return (
    <div className={classnames(
      'notification is-danger is-light has-text-weight-normal',
      {
        hidden: errorMessage.length && !isErrorHidden,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Delete"
        onClick={() => setIsErrorHidden(false)}
      />

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
