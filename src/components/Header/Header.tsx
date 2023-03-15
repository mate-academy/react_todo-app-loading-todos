export const Header: React.FC = () => (
  <header className="todoapp__header">
    <button
      aria-label="toogle-all"
      type="button"
      className="todoapp__toggle-all
      active"
    />

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
