export const Header: React.FC = () => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        aria-label="All"
        className="todoapp__toggle-all active"
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
};
