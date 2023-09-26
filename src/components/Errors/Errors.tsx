import { useContext } from 'react';
import cn from 'classnames';
import { ErrorsContext } from '../../providers/ErrorsProvider/ErrorsProvider';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const Errors = () => {
  const contextErrors = useContext(ErrorsContext);

  const { errors } = contextErrors;

  const {

    errorLoadingTodos,

  } = errors;

  // if (Object.values(errors).every(error => error === false)) {
  //   return null;
  // }

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorLoadingTodos,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        // onClick={clearErrors}
      />
      {/* show only one message at a time */}

      <>
        Unable to load todos
        <br />
      </>

      {/* <>
        Title should not be empty
        <br />
      </>

      <>
        Unable to add a todo
        <br />
      </>

      <>
        Unable to delete a todo
        <br />
      </>
      Unable to update a todo */}
    </div>
  );
};
