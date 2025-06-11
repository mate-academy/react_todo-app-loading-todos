import cn from 'classnames';

interface HeaderProps {
  isAllTodosCompleted: boolean;
}
export const Header: React.FC<HeaderProps> = ({ isAllTodosCompleted }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={cn('todoapp__toggle-all', {
        active: isAllTodosCompleted,
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
