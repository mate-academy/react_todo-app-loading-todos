import { TodoInput } from '../TodoInput/TodoInput';

export const Header = () => (
  <header className="todoapp__header">
    {/* this buttons is active only if there are some active todos */}
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button type="button" className="todoapp__toggle-all active" />

    {/* Add a todo on form submit */}
    <TodoInput />
  </header>
);
