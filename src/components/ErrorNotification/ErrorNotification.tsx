import { useTodos } from '../../context/TodosContext';
import cn from 'classnames';
export const ErrorNotification: React.FC = () => {
  const { todosError, handleRemoveError } = useTodos();

  {
    /* DON'T use conditional rendering to hide the notification */
  }
  {
    /* Add the 'hidden' class to hide the message smoothly */
  }
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !todosError,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleRemoveError}
      />
      {todosError}
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
