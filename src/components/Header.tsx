/* eslint-disable jsx-a11y/control-has-associated-label */
interface HeaderProps {
  hasActive: boolean
}

export const Header: React.FC<HeaderProps> = ({ hasActive }) => {
  return (
    <header className="todoapp__header">
      {hasActive
          && <button type="button" className="todoapp__toggle-all active" />}
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
