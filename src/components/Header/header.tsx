import classNames from 'classnames';
import { RefObject } from 'react';

type Props = {
  newTodoField: RefObject<HTMLInputElement>,
  numberOfCompletedTodo?: number,
};

export const Header: React.FC<Props> = ({
  newTodoField,
  numberOfCompletedTodo,
}) => (
  <header className="todoapp__header">
    <button
      aria-label="ToggleAllButton"
      data-cy="ToggleAllButton"
      type="button"
      className={classNames('todoapp__toggle-all',
        {
          active: !numberOfCompletedTodo,
        })}
    />

    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
