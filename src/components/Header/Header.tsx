/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  todosCount: number;
}

export const Header:React.FC<Props> = ({ todosCount }) => {
  return (
    <header className="todoapp__header">
      {todosCount > 0 && (
        <button type="button" className="todoapp__toggle-all active" />
      )}

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
