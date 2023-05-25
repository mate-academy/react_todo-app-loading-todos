import cn from 'classnames';
import { useTodosContext } from '../utils/TodosContext';

export const TodosError = () => {
  const { error, setError } = useTodosContext();

  return (
    <div
      className={cn(
        {
          // eslint-disable-next-line max-len
          'notification is-danger is-light has-text-weight-normal hidden': !error,
          'notification is-danger is-light has-text-weight-normal': error,
        },
      )}
    >
      { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => setError(false)}
      />
      Unable to load a todo
      {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
    </div>
  );
};
