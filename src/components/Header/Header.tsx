import cn from 'classnames';

interface HeaderProps {
  activeTodos: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTodos,
}) => {
  return (
    <header className="todoapp__header">
      {/* eslint-disable jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: activeTodos,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
