import { NewTodo } from './NewTodo';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface HeaderProps {
  hasActiveTodos: boolean
}

export const Header: React.FC<HeaderProps> = ({ hasActiveTodos }) => {
  return (
    <header className="todoapp__header">
      {hasActiveTodos
          && <button type="button" className="todoapp__toggle-all active" />}
      <NewTodo />
    </header>
  );
};
