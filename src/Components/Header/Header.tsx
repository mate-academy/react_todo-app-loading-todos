import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  isActive: number;
}

export const Header: React.FC<Props> = ({ todos, isActive }) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          aria-label="todo comleted"
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !isActive,
          })}
        />
      )}

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
