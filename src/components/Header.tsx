import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface HeaderProps {
  todos: Todo[];
  completedTodos: Todo[];
  onTodosToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  todos,
  completedTodos,
  onTodosToggle,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: completedTodos.length === todos.length,
          })}
          data-cy="ToggleAllButton"
          onClick={onTodosToggle}
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};
