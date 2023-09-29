/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type HeaderProps = {
  title: string;
  setTitle: (string: string) => void;
  handleSubmit: (event: { preventDefault: () => void }) => void;
  todos: Todo[];
};

export const Header: React.FC<HeaderProps> = ({
  title,
  setTitle,
  handleSubmit,
  todos,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: todos.length })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
