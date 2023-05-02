/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

type Props = {
  activeAllTodos: boolean,
};

export const TodoForm: React.FC<Props> = ({ activeAllTodos }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames(
        'todoapp__toggle-all',
        {
          active: activeAllTodos,
        },
      )}
    />

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
