import classNames from 'classnames';
import { LegacyRef } from 'react';

type Props = {
  isAllFinished: boolean,
  newTodoInputRef: LegacyRef<HTMLInputElement>,
};

export const NewTodo: React.FC<Props> = ({
  newTodoInputRef,
  isAllFinished,
}) => {
  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        aria-label="ToggleAll"
        type="button"
        className={classNames('todoapp__toggle-all', { active: isAllFinished })}
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoInputRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
