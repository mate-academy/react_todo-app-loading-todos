export const Header = () => {
  return (
    <div>
      <header className="todoapp__header">

        <button
          type="button"
          className="todoapp__toggle-all active"
          aria-label="toggle-all"
        />

        <form>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
    </div>
  );
};
