/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

type Props = {
  errorMessage: string;
  setErrorMessage: (value: string) => void
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage, setErrorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      // className="notification is-danger is-light has-text-weight-normal hidden"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: errorMessage.length === 0,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};

// {/* <div
//       data-cy="ErrorNotification"
//       className="notification is-danger is-light has-text-weight-normal hidden"
//     >
//       <button data-cy="HideErrorButton" type="button" className="delete" />
//       // show only one message at a time
//       Unable to load todos
//       <br />
//       Title should not be empty
//       <br />
//       Unable to add a todo
//       <br />
//       Unable to delete a todo
//       <br />
//       Unable to update a todo
//     </div> */}
