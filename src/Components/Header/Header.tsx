import classNames from 'classnames';

interface HeaderProps {
  active: number;
}

export const Header = ({ active }: HeaderProps) => {
  const isAllActive = !active ? true : false;

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames(`todoapp__toggle-all `, { active: isAllActive })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
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
