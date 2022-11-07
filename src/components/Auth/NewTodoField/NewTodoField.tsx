import React from 'react';
import { ErrorType } from '../../../types/ErrorType';

type Props = {
  onAddError:(event: React.KeyboardEvent<HTMLInputElement>) => void;
  onError: (errorType: ErrorType) => | void;
  newTodoField: React.RefObject<HTMLInputElement>;
  hasTodos: boolean;
};

export const NewTodoField: React.FC<Props> = React.memo(({
  onAddError,
  onError,
  newTodoField,
  hasTodos,
}) => {
  return (
    <header className="todoapp__header">
      {hasTodos && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
          onClick={() => onError(ErrorType.UPDATE)}
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onFocus={() => onError(ErrorType.NONE)}
          onKeyDown={(event => onAddError(event))}
        />
      </form>
    </header>
  );
});
