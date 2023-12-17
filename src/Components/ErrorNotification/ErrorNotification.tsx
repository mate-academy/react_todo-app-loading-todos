import cn from 'classnames';
import { useEffect } from 'react';
import { defaultErrorMessages, useTodoContext } from '../../Context/Context';

export const ErrorNotification = () => {
  const { errorMessage, setErrorMessage } = useTodoContext();
  const {
    load,
    title,
    add,
    update,
    remove,
  } = errorMessage;
  const hasError = load || title || add || update || remove;

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(defaultErrorMessages);
    }, 3000);
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal',
        { hidden: !hasError })}
    >
      <button
        aria-label="Hide Error Button"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(defaultErrorMessages)}
      />
      { load }
      <br />
      { title && 'Title should not be empty'}
      <br />
      { add && 'Unable to add a todo'}
      <br />
      { remove && 'Unable to delete a todo'}
      <br />
      { update && 'Unable to update a todo'}
    </div>
  );
};
