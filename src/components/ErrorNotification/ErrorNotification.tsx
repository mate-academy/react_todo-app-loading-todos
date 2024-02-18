import { useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, TodosContext } from '../../Store';
/* eslint-disable jsx-a11y/control-has-associated-label */
export const ErrorNotification: React.FC = () => {
  const { error } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div
      hidden={!error}
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => dispatch({ type: 'setError', payload: null })}
      />
      {error}
      {/* show only one message at a time */}
      {/* Unable to load todos
      <br />
      Title should not be empty!!!!!
      <br />
      Unable to add a todo !!!!
      <br />
      Unable to delete a todo !!!!!
      <br />
      Unable to update a todo!!!!!!
      */}
    </div>
  );
};
