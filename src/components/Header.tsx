import classNames from 'classnames';

type Props = {
  countActiveTodos: number;
};

export const Header: React.FC<Props> = ({ countActiveTodos }) => {
  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: countActiveTodos,
        })}
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          // value={title}
          // onChange={}
        />
      </form>
    </header>
  );
};
