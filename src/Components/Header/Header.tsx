import { FC } from 'react';

const Header: FC = () => (
  <header className="todoapp__header">
    {/* this buttons is active only if there are some active todos */}
    {/* eslint-disable-next-line */}
    <button
      type="button"
      className="todoapp__toggle-all active"
    />

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

export default Header;
