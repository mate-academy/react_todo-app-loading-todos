import cn from 'classnames';
import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';

export const Header = () => {
  const { todos } = useContext(TodoContext);
  const isCompleted = todos.some(({ completed }) => completed);

  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isCompleted,
          hidden: !todos.length,
        })}
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
