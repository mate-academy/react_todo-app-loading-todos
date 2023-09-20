import { FC, useContext, useState } from 'react';
import cn from 'classnames';
import { ErrorProvider } from '../../context/TodoError';

type TTodoErrorProps = {

};

export const ErrorBox: FC<TTodoErrorProps> = () => {
  const {
    hasLoadingError,
    hasSearchValueError,
    hasDeleteTodoError,
    hasUpdateTodoError,
    hasAddTodoError,
  } = useContext(ErrorProvider);

  const [isClose, setIsClose] = useState(false);

  const hasAnyError = hasLoadingError
    || hasSearchValueError
    || hasDeleteTodoError
    || hasUpdateTodoError
    || hasAddTodoError;

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !hasAnyError || isClose,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="delete"
        onClick={() => setIsClose(true)}
      />
      {hasLoadingError && 'Unable to load todos'}
      {hasSearchValueError && 'Title should not be empty'}
      {hasAddTodoError && 'Unable to add a todo'}
      {hasDeleteTodoError && 'Unable to delete a todo'}
      {hasUpdateTodoError && 'Unable to update a todo'}
    </div>
  );
};
