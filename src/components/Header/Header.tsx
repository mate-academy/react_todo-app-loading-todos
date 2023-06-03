import { NewTodo } from '../NewTodo/NewTodo';

interface HeaderProps {
  hasActiveTodos: boolean,
}

/* this buttons is active only if there are some active todos  */
export const Header: React.FC<HeaderProps> = ({ hasActiveTodos }) => {
  return (
    <header className="todoapp__header">
      {hasActiveTodos && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          aria-label="button"
        />
      )}
      <NewTodo />
    </header>
  );
};
