// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" className="todoapp__toggle-all active" />
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
