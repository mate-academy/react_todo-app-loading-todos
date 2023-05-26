/* eslint-disable jsx-a11y/control-has-associated-label */
export function Header() {
  return (
    <header className="todoapp__header">
      {/* these buttons are active only if there are some active todos */}
      <button type="button" className="todoapp__toggle-all active" />

      {/* Add a todo on form submit */}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
}
