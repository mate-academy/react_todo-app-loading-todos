/* eslint-disable jsx-a11y/control-has-associated-label */

export const Header: React.FC = () => {
  return (
    <header className="todoapp__header">
      <button type="button" className="todoapp__toggle-all active" />

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
