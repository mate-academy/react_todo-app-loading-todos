import { NewTodo } from './NewTodo';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface HeaderProps {
  hasActive: boolean
}

export const Header: React.FC<HeaderProps> = ({ hasActive }) => {
  return (
    <header className="todoapp__header">
      {hasActive
          && <button type="button" className="todoapp__toggle-all active" />}
      <NewTodo />
    </header>
  );
};
