import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  allTodos: Todo[],
  activeTodos: Todo[],
};

export const Header: React.FC<Props> = ({
  allTodos,
  activeTodos,
}) => {
  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all', { active: activeTodos.length === 0 },
        )}
        style={{ opacity: +Boolean(allTodos.length) }}
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
