export const Header = () => (
  <header className="todoapp__header">
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button type="button" className="todoapp__toggle-all active" />

    {/* Add a todo on form submit */}
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
