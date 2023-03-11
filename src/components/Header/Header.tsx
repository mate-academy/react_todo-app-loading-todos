/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

type Props = {
  activeTodos: number;
  hasTodos: boolean;
};

export const Header: React.FC<Props> = ({ activeTodos, hasTodos }) => {
  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            { active: activeTodos },
          )}
        />
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
