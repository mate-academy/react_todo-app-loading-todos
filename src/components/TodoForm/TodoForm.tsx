/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

type Props = {
  amountActiveTodos: number,
};

export const TodoForm: React.FC<Props> = ({ amountActiveTodos }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames(
        'todoapp__toggle-all',
        {
          active: !amountActiveTodos,
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
